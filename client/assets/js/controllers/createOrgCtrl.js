"use strict";
(function () {
    angular.module("application")
        .controller("createOrgCtrl", ["$scope", "FoundationApi","UserContextService", "OrgService","EventService",
            function ($scope, FoundationApi,UserContextService, OrgService,EventService) {

                $scope.org = {
                    name: "",
                    domain: "",
                    isAgreed: false
                };

                $scope.createOrg = function () {

                    var currentUserEmail = UserContextService.getPersonalAccountInfo().currentUserData.email.replace(/.*@/,"");
                    if(currentUserEmail != $scope.org.domain){
                        FoundationApi.publish('main-notifications', {
                                title: 'ERROR',
                                content: 'Domain mismatch',
                                color: 'warning',
                                autoclose: "3000"
                            }
                        );
                        return;
                    }

                    if ($scope.org.name == "" || $scope.org.domain == "" || $scope.org.isAgreed == false) {
                        FoundationApi.publish('main-notifications', {
                                title: 'ERROR',
                                content: 'Invalid input',
                                color: 'warning',
                                autoclose: "3000"
                            }
                        );
                        return;
                    }

                    FoundationApi.publish('loaderModal', 'open');
                    OrgService.createOrg($scope.org)
                        .then(function (response) {
                            EventService.trigger('orgCreated',response.data.data);
                            UserContextService.saveCurrentUserOrg(response.data.data);
                            FoundationApi.publish('loaderModal', 'close');
                            FoundationApi.publish('createOrgModal', 'close');
                        });
                }
            }]);
})();