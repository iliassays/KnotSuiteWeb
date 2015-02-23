"use strict";

(function () {
    angular.module("application")
        .controller("PersonalSettingsCtrl",
        ["$scope", "ProfileService", "$stateParams", "$rootScope", "ApiService", "LoginService", "$location",
            function ($scope, ProfileService, $stateParams, $rootScope, ApiService, LoginService, $location) {
                if (!LoginService.isLoggedIn()) {
                    $location.path('/');
                }
                var userId = LoginService.getCurrentUserId();
                ProfileService.getProfileById(userId).then(function (data) {
                    $scope.profilePicture = ApiService.apiUrl + '/' + data.connData.imgSrc;
                });
                $scope.saveDate = function () {
                }
            }]);
})();
