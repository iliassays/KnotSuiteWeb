"use strict";
(function () {
    angular.module("application")
        .controller("previewAppCtrl", ["$scope", function ($scope) {
            $scope.platforms = ["Desktop", "Windows Phone", "iPhone", "Android"];
            $scope.request = {};
            $scope.sendPreviewRequest = function(request){
                console.log($scope.request);
            }
        }]);
})();