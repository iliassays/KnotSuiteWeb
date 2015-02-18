"use strict";

(function () {
    angular.module('application').controller("ProfileCtrl",
        ["$scope", "$stateParams", "ProfileService", "$state", "LoginService", "$location",
            function ($scope, $stateParams, ProfileService, $state, LoginService, $location) {
                if (!LoginService.isLoggedIn()) {
                    $location.path('/');
                }
                $state.go('profile.personalSettings');
            }]);
})();