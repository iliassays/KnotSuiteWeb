"use strict";
(function () {
    angular.module("application")
        .controller("nominateAwardCtrl",
        ["$scope", "$state", "$stateParams", "DummyDataService",
            "MixPanelService", "$rootScope", "UserContextService","$location","AwardService","FoundationApi",
            function ($scope, $state, $stateParams, DummyDataService, MixPanelService,
                      $rootScope, UserContextService,$location,AwardService,FoundationApi) {
                MixPanelService.track("Nominate Award");

                $scope.connections = {
                    isShow : false,
                    people:[]
                };

                $scope.selectedCandidate = {

                };

                var awardId = $stateParams.awardId;

                $scope.award = $rootScope.selectedAward;

                var currentAccount = UserContextService.getCurrentlySignedAsAccount();

                $scope.awardNominationData = {
                      whoCanPledge: currentAccount.isPersonalAccount == true? currentAccount.accountId : currentAccount.accountInfo.id,
                      candidates:[],
                      templateId:$scope.award._id,
                      initialPledgeRequired:$scope.initialPledgeRequired,
                      comment:"",
                      accessToken:""
                };

                $scope.whoCanPledge = currentAccount.isPersonalAccount == true? "Public":currentAccount.accountInfo.title;

                $scope.showConnection = function () {
                    FoundationApi.publish('loaderModal', 'open');
                    UserContextService.getCurrentAccountConnections('').then(function (response) {
                        $scope.connections.people = response;
                        $scope.connections.isShow = true;
                        FoundationApi.publish('loaderModal', 'close');
                    });
                };

                $scope.selectCandidate = function(person){
                    $scope.selectedCandidate = person;
                    $scope.connections.isShow = false;
                };

                $scope.nominate = function(){
                    FoundationApi.publish('loaderModal', 'open');
                    $scope.awardNominationData.candidates.push($scope.selectedCandidate.id);
                    AwardService.nominateAward($scope.awardNominationData)
                        .then(function(response){
                            FoundationApi.publish('main-notifications', {
                                    title: 'AWARD',
                                    content: 'Award Nominated successfully',
                                    color: 'success',
                                    autoclose: "3000"
                                }
                            );
                            FoundationApi.publish('loaderModal', 'close');
                            $location.path('/');
                        });
                }

            }]);
})();