"use strict";
(function () {
    angular.module('application').controller('myProfileCtrl',
        ["$scope", "ProfileService", "ApiService", "LoginService", "$location",
            function ($scope, ProfileService, ApiService, LoginService, $location) {
                var userId = LoginService.getCurrentUserId();
                ProfileService.getProfileById(userId).then(function (data) {
                    $scope.myPhoto = ApiService.apiUrl + '/' + data.connData.imgSrc;
                    $scope.myName = data.connData.firstName+" "+data.connData.lastName;
                    $scope.myEmail = data.connData.email;
                });
            }]);
})();