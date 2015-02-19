'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope', 'LoginService', '$location', '$rootScope', 'EventService',
            function ($scope, LoginService, $location, $rootScope, EventService) {

                if (LoginService.isLoggedIn()) {
                    $location.path('/profile');
                }

                $scope.user = {
                    loginEmail: "brian.tobey123@gmail.com",
                    loginPassword: "@ddinstagram",
                    clientURI: "test",
                    timeOffset: 360,
                    appId: "knotsillicon",
                    IsValidationEnabled: true,
                    Errors: {
                        Errors: {},
                        IsValidationEnabled: true
                    }
                };

                $scope.loginNow = function () {
                    LoginService.sendLoginRequest($scope.user).then(function (data) {
                        LoginService.saveAccessToken(data.userObj.accessToken);
                        LoginService.saveAccountId(data.userObj.accountId);
                        $rootScope.userData = data.userObj;
                        console.log(data.userObj);
                        console.log(data.userObj.userName);
                        EventService.trigger('signedIn');
                        EventService.trigger('updateProfilePicture',data.userObj);
                        $location.path('/profile');
                    });
                };

            }]);
})();

