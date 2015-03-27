"use strict";

(function () {
    angular.module("application")
        .controller("PersonalSettingsCtrl",
        ["$scope", "ProfileService", "$stateParams", "$rootScope", "ApiService", "LoginService", "$location","MixPanelService",
            function ($scope, ProfileService, $stateParams, $rootScope, ApiService, LoginService, $location,MixPanelService) {
                MixPanelService.track("Personal Settings");
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
