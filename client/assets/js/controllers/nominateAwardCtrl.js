"use strict";
(function () {
    angular.module("application")
        .controller("nominateAwardCtrl", ["$scope", "$state", "$stateParams","DummyDataService","MixPanelService",
            function ($scope, $state, $stateParams,DummyDataService,MixPanelService) {
                MixPanelService.track("Nominate Award");
                var awardId = $stateParams.awardId;
                $scope.award = DummyDataService.getAwardById(awardId);
            }])
})();