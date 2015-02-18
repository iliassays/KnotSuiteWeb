'use strict';
(function () {
    angular.module('application')
        .controller('LoginCtrl',
        ['$scope', 'LoginService', '$location', '$rootScope',
            function ($scope, LoginService, $location, $rootScope) {
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
                        console.log(data);
                        $rootScope.userData = data.userObj;
                        //toaster.pop("title", "text");
                        $location.path('/profile');
                    });
                };

            }]);
})();

