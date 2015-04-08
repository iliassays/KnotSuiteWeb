"use strict";
(function () {
    angular.module('application')
        .controller("myAwardCtrl",
        ["$scope", "DummyDataService", "MixPanelService", "AwardService","UserContextService","$state",
            function ($scope, DummyDataService, MixPanelService, AwardService,UserContextService,$state) {
                MixPanelService.track("My Award");

                var userId = UserContextService.getCurrentUserId();

                AwardService.getAllAwards()
                    .then(function (response) {
                        if (response.code) {

                            $scope.awards = response.data;

                            $scope.totalAwards = $scope.awards.length;

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

                AwardService.getNominatedAwardById(userId).then(function (response) {
                    if (response.code) {
                        $scope.nominatedAwards = response.data.awardList;
                        $scope.totalNominatedAward = $scope.nominatedAwards.length;
                    }
                });

                $scope.onAwardSelect = function(award){
                    $rootScope.selectedAward = award;
                    $scope.award = award;
                    $state.go('myProfile.nominateAward',{awardId:award._id});
                }

            }]);
})();