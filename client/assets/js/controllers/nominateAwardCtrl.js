"use strict";
(function () {
    angular.module("application")
        .controller("nominateAwardCtrl", ["$scope", "$state", "$stateParams","DummyDataService",
            function ($scope, $state, $stateParams,DummyDataService) {
                var awardId = $stateParams.awardId;
                $scope.award = DummyDataService.getAwardById(awardId);
            }])
})();