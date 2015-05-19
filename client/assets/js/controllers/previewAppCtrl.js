"use strict";
(function () {
    angular.module("application")
        .controller("previewAppCtrl", ["$scope", "UserContextService", "$location",
            function ($scope, UserContextService, $location) {
                $scope.platforms = ["Desktop", "Windows Phone", "iPhone", "Android"];
                $scope.request = {};
                if (UserContextService.isLoggedIn()) {
                    $location.path('/myProfile');
                }
                $scope.sendPreviewRequest = function (request) {
                    console.log($scope.request);
                }
            }]);
})();