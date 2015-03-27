'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope', 'LoginService', '$location', '$rootScope', 'EventService','MixPanelService',
            function ($scope, LoginService, $location, $rootScope, EventService,MixPanelService) {
                MixPanelService.track("Login Page");
                if (LoginService.isLoggedIn()) {
                    $location.path('/myProfile');
                }

                $scope.user = {
                    loginEmail:"brian.tobey123@gmail.com",
                    loginPassword:"@ddinstagram",
                    clientURI:"NO_CLIENT_URI",
                    timeOffset:360
                }

                //$scope.user = {
                //    loginEmail: "",
                //    loginPassword: "",
                //    clientURI: "test",
                //    timeOffset: 360,
                //    appId: "knotsillicon",
                //    IsValidationEnabled: true,
                //    Errors: {
                //        Errors: {},
                //        IsValidationEnabled: true
                //    }
                //};

                $scope.loginNow = function () {
                    LoginService.sendLoginRequest($scope.user).then(function (data) {
                        console.log(data);
                        if(data.accountStatus==2){
                            LoginService.saveAccessToken(data.userObj.accessToken);
                            LoginService.saveAccountId(data.userObj.accountId);
                            $rootScope.userData = data.userObj;
                            EventService.trigger('signedIn');
                            EventService.trigger('updateProfilePicture',data.userObj);
                            $location.path('/myProfile');
                        }
                    });
                };

            }]);
})();

