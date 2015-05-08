'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope',
            'LoginService',
            '$location',
            '$rootScope',
            'EventService',
            'MixPanelService',
            'UserContextService',
            "FoundationApi","ModalFactory",
            function ($scope, LoginService, $location, $rootScope, EventService,
                      MixPanelService, UserContextService, FoundationApi,ModalFactory) {
                MixPanelService.track("Login Page");

                if (UserContextService.isLoggedIn()) {
                    $location.path('/myProfile');
                }

                //$scope.user = {
                //    loginEmail: "brian.tobey123@gmail.com",
                //    loginPassword: "@ddinstagram",
                //    clientURI: "NO_CLIENT_URI",
                //    timeOffset: 360,
                //    deviceId:"3036205801742285013458501820760104018013402423402308740622061044101202541709024832",
                //    clientUriExpiryDate:"2015-05-08T07:44:42.000Z",
                //    appId:"knotsuite"
                //}

               //$scope.user = {
               //     loginEmail: "brian.tobey123@gmail.com",
               //    loginPassword: "@ddinstagram",
               //    clientURI: "NO_CLIENT_URI",
               //    timeOffset: 360
               //}

                $scope.user = {
                    loginEmail: "",
                    loginPassword: "",
                    clientURI: "NO_CLIENT_URI",
                    timeOffset: 360
                };


                $scope.loginNow = function () {
                    FoundationApi.publish('loaderModal', 'open');
                    LoginService.sendLoginRequest($scope.user).then(function (response) {
                        var data = response.data;
                        if (data.accountStatus == 2) {

                            UserContextService.saveCurrentUserData(data.userObj);

                            FoundationApi.publish('main-notifications', {
                                    title: 'LOGIN',
                                    content: 'You have logged in successfully',
                                    color: 'success',
                                    autoclose: "3000"
                                }
                            );

                            EventService.trigger('signedIn');
                            EventService.trigger('updateProfilePicture', data.userObj);
                            $location.path('/myProfile');
                        } else {
                            FoundationApi.publish('main-notifications', {
                                    title: 'ERROR',
                                    content: data.message,
                                    color: 'warning',
                                    autoclose: "3000"
                                }
                            );
                        }
                        FoundationApi.publish('loaderModal', 'close');
                    });
                };

                $scope.loginAlert = function(){
                    FoundationApi.publish('main-notifications', {
                            title: 'LOGIN',
                            content: 'Please login first to proceed.',
                            color: 'warning',
                            autoclose: "3000"
                        }
                    );
                }

            }]);
})();

