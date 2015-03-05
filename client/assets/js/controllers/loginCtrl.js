'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope', 'LoginService', '$location', '$rootScope', 'EventService',
            function ($scope, LoginService, $location, $rootScope, EventService) {

                if (LoginService.isLoggedIn()) {
                    $location.path('/myProfile');
                }

                $scope.user = {
                    loginEmail:"brian.tobey123@gmail.com",
                    loginPassword:"@ddinstagram",
                    clientURI:"https://sin.notify.windows.com/?token=AwYAAAAYaXbUiSo8h8p1pHS4uAMqt8zhTQpFw5cHw%2beb3h0%2fJqCpEiBEkOTCCtIli8V%2fShIuDPMsqVUElSe7m4%2fbT4Azo7cLeugjZpg0%2bkcLu4xVer8ILdth9YcmRCkNSZye2bI%3d",
                    timeOffset:360,
                    appId:"knotsillicon",
                    IsValidationEnabled:true,
                    Errors:{
                        Errors:{

                        },
                        IsValidationEnabled:true
                    }
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

