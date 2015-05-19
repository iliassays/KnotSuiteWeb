"use strict";
(function () {
    angular.module("application")
        .controller("myNetWorkCtrl", ["$scope", "DummyDataService", "MixPanelService", "UserContextService", "FoundationApi",
            function ($scope, DummyDataService, MixPanelService, UserContextService, FoundationApi) {

                MixPanelService.track("My Network");

                $scope.groupCollection = {};
                FoundationApi.publish('loaderModal', 'open');
                $scope.peoplePickerGroups = [
                    {key: "connType", value: "Group by connection type"},
                    {key: "entityType", value: "Group by type"},
                    {key: "nameType", value: "Group by name"}
                ];

                $scope.selectedPeoplePickerGroup = $scope.peoplePickerGroups[1];

                UserContextService.getAllConnectionsOfUser().then(function (response) {
                    var data = response.data;
                    $scope.peoplePickerFlag = true;

                    $scope.groupCollection["connType"] = _.groupBy(data, function (m) {
                        return m.connType;
                    });
                    $scope.groupCollection["entityType"] = _.groupBy(data, function (m) {
                        return m.entityType;
                    });

                    $scope.groupCollection["nameType"] = _.groupBy(data, function (m) {
                        return m.title.charAt(0);
                    });

                    if ($scope.selectedPeoplePickerGroup) {
                        $scope.selectedGroup = $scope.groupCollection[$scope.selectedPeoplePickerGroup.key];
                    } else {
                        $scope.selectedGroup = $scope.groupCollection["connType"];
                    }
                    FoundationApi.publish('loaderModal', 'close');
                });

                $scope.updatePeoplePickerResults = function (selectedPeoplePickerGroup) {
                    if (selectedPeoplePickerGroup) {
                        $scope.selectedGroup = $scope.groupCollection[selectedPeoplePickerGroup.key];
                    }
                }
            }]);
})();