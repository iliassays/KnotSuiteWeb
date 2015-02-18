'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope', 'LoginService', '$location', '$rootScope',
            function ($scope, LoginService, $location, $rootScope) {

                if(LoginService.isLoggedIn()){
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
                        $rootScope.userData = data.userObj;
                        $location.path('/profile');
                    });
                };

            }]);
})();

