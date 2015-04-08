"use strict";

(function () {
    angular.module("application")
        .controller("PersonalSettingsCtrl",
        ["$scope", "UserContextService", "$stateParams", "$rootScope", "ApiService", "LoginService", "$location","MixPanelService",
            function ($scope, UserContextService, $stateParams, $rootScope, ApiService, LoginService, $location,MixPanelService) {
                MixPanelService.track("Personal Settings");
                if (!UserContextService.isLoggedIn()) {
                    $location.path('/');
                }
                var userId = UserContextService.getCurrentUserId();
                UserContextService.getProfileById(userId).then(function (data) {
                    $scope.profilePicture = ApiService.apiUrl + '/' + data.connData.imgSrc;
                });
                $scope.saveDate = function () {
                }
            }]);
})();
