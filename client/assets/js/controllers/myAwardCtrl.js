"use strict";
(function () {
    angular.module('application')
        .controller("myAwardCtrl",
        ["$scope","DummyDataService","MixPanelService",
            function ($scope,DummyDataService,MixPanelService) {
                MixPanelService.track("My Award");
                $scope.awards = DummyDataService.getAward();
                $scope.nominatedAwards = DummyDataService.getNominatedAward();
                $scope.totalNominatedAward = $scope.nominatedAwards.length;
                $scope.totalAwards = $scope.awards.length;

            }]);
})();