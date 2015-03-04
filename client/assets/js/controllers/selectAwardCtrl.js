"use strict";
(function(){
    angular.module("application")
        .controller("selectAwardCtrl",
        ["$scope","DummyDataService","$state",
            function($scope,DummyDataService,$state){
                $scope.awardsGroup = DummyDataService.getAwardList();
                $scope.onAwardSelect = function(award){
                    $state.go('myProfile.nominateAward',{awardId:award._id});
                }
        }]);
})();