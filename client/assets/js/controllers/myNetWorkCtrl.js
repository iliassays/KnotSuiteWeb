"use strict";
(function () {
    angular.module("application")
        .controller("myNetWorkCtrl", ["$scope", "DummyDataService",
            function ($scope, DummyDataService) {
                $scope.peoplePickerFlag = true;
                $scope.groupCollection = {};
                $scope.peoplePickerGroups = [
                    {key: "connType", value: "Group by connection type"},
                    {key: "entityType", value: "Group by type"},
                    {key: "nameType", value: "Group by name"}
                ];
                $scope.capitalize = function (text) {
                    return _.capitalize(text);
                }
                var data = DummyDataService.peoplePickerResults;
                $scope.peoplePickerFlag = true;
                for (var i = 0; i < data.length; i++) {
                    data[i].smallpicture = 'https://prod-frontserver.herokuapp.com/' + data[i].smallpicture;
                }

                $scope.groupCollection["connType"] = _.groupBy(data, function(m) {
                    return m.connType;
                });
                $scope.groupCollection["entityType"] = _.groupBy(data, function(m) {
                    return m.entityType;
                });
                $scope.groupCollection["nameType"] =  _.groupBy(data, function(m) {
                    return m.title.charAt(0);
                });

                if($scope.selectedPeoplePickerGroup){
                    $scope.selectedGroup = $scope.groupCollection[$scope.selectedPeoplePickerGroup.key];
                }else{
                    $scope.selectedGroup = $scope.groupCollection["connType"];
                }

                $scope.updatePeoplePickerResults = function(selectedPeoplePickerGroup){
                    if(selectedPeoplePickerGroup){
                        $scope.selectedGroup = $scope.groupCollection[selectedPeoplePickerGroup.key];
                    }
                }

            }]);
})();