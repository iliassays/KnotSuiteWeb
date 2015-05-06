"use strict";
(function () {
    angular.module("application")
        .controller("searchCtrl", ["$scope", "ConnectionRequestService", function ($scope, ConnectionRequestService) {

            $scope.searchflag = false;
            $scope.siteSearchResult = [];

            $scope.updateSearchResult = function (siteSearchKey) {
                if (siteSearchKey == "") {
                    $scope.siteSearchResult = [];
                    return;
                }

                ConnectionRequestService.getSuggestedConnections(null, siteSearchKey)
                    .then(function (response) {
                        console.log($scope.siteSearchKey);
                        if (siteSearchKey != "") {
                            $scope.siteSearchResult = response.data;
                        }
                    });
            }
        }]);
})();