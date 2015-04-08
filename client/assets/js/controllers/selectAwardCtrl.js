"use strict";
(function(){
    angular.module("application")
        .controller("selectAwardCtrl",
        ["$scope","DummyDataService","$state","MixPanelService","AwardService","$rootScope",
            function($scope,DummyDataService,$state,MixPanelService,AwardService,$rootScope){
                MixPanelService.track("Select Award");

                AwardService.getAllAwards()
                    .then(function (response) {
                        if (response.code) {

                            $scope.awardsGroup ={
                                "#UNTAGGED":[]
                            };

                            var temp = angular.copy(response.data);
                            angular.forEach(temp,function(award){

                                if(award.tags.length>0){
                                    angular.forEach(award.tags,function(tag){
                                        if(!$scope.awardsGroup.hasOwnProperty(tag.tagName)){
                                            $scope.awardsGroup[tag.tagName] = [];
                                        }
                                        $scope.awardsGroup[tag.tagName].push(award);

                                    });
                                }else{
                                    if(!$scope.awardsGroup.hasOwnProperty("#UNTAGGED")){
                                        $scope.awardsGroup["#UNTAGGED"] = [];
                                    }
                                    $scope.awardsGroup["#UNTAGGED"].push(award);
                                }
                            });
                        }
                    });

                $scope.onAwardSelect = function(award){
                    $rootScope.selectedAward = award;
                    $state.go('myProfile.nominateAward',{awardId:award._id});

                }
        }]);
})();