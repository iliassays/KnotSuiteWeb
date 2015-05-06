"use strict";
(function(){
    angular.module("application")
        .controller("selectAwardCtrl",
        ["$scope","DummyDataService","$state","MixPanelService","AwardService","$rootScope","FoundationApi",
            function($scope,DummyDataService,$state,MixPanelService,AwardService,$rootScope,FoundationApi){
                MixPanelService.track("Select Award");
                FoundationApi.publish('loaderModal', 'open');
                AwardService.getAllAwards()
                    .then(function (response) {
                        var data = response.data;
                        if (data.code) {
                            $scope.awardsGroup ={
                                "#UNTAGGED":[]
                            };

                            var temp = angular.copy(data.data);
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
                        FoundationApi.publish('loaderModal', 'close');
                    });

                $scope.onAwardSelect = function(award){
                    $rootScope.selectedAward = award;
                    $state.go('myProfile.nominateAward',{awardId:award._id});
                }
        }]);
})();