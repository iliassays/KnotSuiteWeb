"use strict";

(function () {
    angular.module('application').controller("ProfileCtrl",
        ["$scope", "$stateParams", "UserContextService", "$state", "LoginService", "$location",
            function ($scope, $stateParams, UserContextService, $state, LoginService, $location) {
                if (!UserContextService.isLoggedIn()) {
                    $location.path('/');
                }
                $state.go('profile.personalSettings');
            }]);
})();