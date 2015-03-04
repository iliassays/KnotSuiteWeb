"use strict";
(function () {
    angular.module('application')
        .controller("myAwardCtrl",
        ["$scope","DummyDataService",
            function ($scope,DummyDataService) {
                $scope.awards = DummyDataService.getAward();
                $scope.nominatedAwards = DummyDataService.getNominatedAward();
                $scope.totalNominatedAward = $scope.nominatedAwards.length;
                $scope.totalAwards = $scope.awards.length;

            }]);
})();