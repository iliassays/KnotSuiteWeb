"use strict";
(function(){
    angular.module("application")
        .controller("selectAwardCtrl",
        ["$scope","DummyDataService","$state","MixPanelService",
            function($scope,DummyDataService,$state,MixPanelService){
                MixPanelService.track("Select Award");
                $scope.awardsGroup = DummyDataService.getAwardList();
                $scope.onAwardSelect = function(award){
                    $state.go('myProfile.nominateAward',{awardId:award._id});
                }
        }]);
})();