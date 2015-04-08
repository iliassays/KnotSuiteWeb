"use strict";
(function () {
    angular.module("application")
        .controller("nominateAwardCtrl", ["$scope", "$state", "$stateParams","DummyDataService","MixPanelService","$rootScope",
            function ($scope, $state, $stateParams,DummyDataService,MixPanelService,$rootScope) {
                MixPanelService.track("Nominate Award");
                var awardId = $stateParams.awardId;
                $scope.award = $rootScope.selectedAward;
            }])
})();