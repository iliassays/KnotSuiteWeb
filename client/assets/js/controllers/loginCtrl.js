'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope', 'LoginService', '$location', '$rootScope', 'EventService', 'MixPanelService', 'UserContextService', "FoundationApi",
            function ($scope, LoginService, $location, $rootScope, EventService, MixPanelService, UserContextService, FoundationApi) {
                MixPanelService.track("Login Page");

                if (UserContextService.isLoggedIn()) {
                    $location.path('/myProfile');
                }

                //$scope.user = {
                //    loginEmail:"brian.tobey123@gmail.com",
                //    loginPassword:"@ddinstagram",
                //    clientURI:"NO_CLIENT_URI",
                //    timeOffset:360
                //}

                $scope.user = {
                    loginEmail: "",
                    loginPassword: "",
                    clientURI: "NO_CLIENT_URI",
                    timeOffset: 360
                }

                $scope.loginNow = function () {
                    LoginService.sendLoginRequest($scope.user).then(function (data) {
                        if (data.accountStatus == 2) {
                            UserContextService.saveCurrentUserData(data.userObj);

                            FoundationApi.publish('main-notifications',{
                                    title: 'LOGIN',
                                    content: 'You have logged in successfully',
                                    color: 'success',
                                    autoclose:"3000"
                                }
                                );

                            EventService.trigger('signedIn');
                            EventService.trigger('updateProfilePicture', data.userObj);
                            $location.path('/myProfile');
                        } else {
                            FoundationApi.publish('main-notifications',{
                                    title: 'ERROR',
                                    content: data.message,
                                    color: 'warning',
                                    autoclose:"3000"
                                }
                            );
                        }
                    });
                };

            }]);
})();

