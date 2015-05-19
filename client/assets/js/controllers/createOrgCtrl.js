"use strict";
(function () {
    angular.module("application")
        .controller("createOrgCtrl", ["$scope", "FoundationApi", "OrgService", "OrgService",
            function ($scope, FoundationApi, OrgService) {

                $scope.org = {
                    name: "",
                    email: "",
                    isAgreed: false
                };

                $scope.createOrg = function () {
                    if ($scope.org.name == "" || $scope.org.email == "" || $scope.org.isAgreed == false) {
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
                            console.log(response.data);
                            FoundationApi.publish('loaderModal', 'close');
                            FoundationApi.publish('createOrgModal', 'close');
                        });
                }
            }]);
})();