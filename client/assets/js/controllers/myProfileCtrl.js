//"use strict";
(function () {
    angular.module('application').controller('myProfileCtrl',
        ["$scope", "ProfileService", "ApiService", "LoginService", "$location","DummyDataService",
            function ($scope, ProfileService, ApiService, LoginService, $location,DummyDataService) {
                var userId = LoginService.getCurrentUserId();

                $scope.signal = {
                    connections: [],
                    taggedPeople : []
                };

                $scope.groupByConnType = {};
                $scope.groupByEntityType = {};
                $scope.groupByName = {};

                $scope.groupCollection = {};

                ProfileService.getProfileById(userId).then(function (data) {
                    $scope.myPhoto = ApiService.apiUrl + '/' + data.connData.imgSrc;
                    $scope.myName = data.connData.firstName + " " + data.connData.lastName;
                    $scope.myEmail = data.connData.email;
                });

                $scope.onAttachmentChange = function (attachment) {
                    var file = event.target.files[0];
                    console.log(file);
                };

                $scope.showPeoplePicker = function () {
                    var data = DummyDataService.peoplePickerResults;
                    //ProfileService.personalConnections(null)
                    //    .then(function (data) {
                    //        $scope.peoplePickerFlag = true;
                    //        for (var i = 0; i < data.length; i++) {
                    //            data[i].smallpicture = ApiService.apiUrl + '/' + data[i].smallpicture;
                    //        }
                    //        $scope.peoplePicker = data;
                    //        console.log(data);
                    //    });
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
                        $scope.selectedGroup = $scope.groupCollection["nameType"];
                    }

                };

                $scope.toggleSelectPeople = function (person) {
                    person.isSelected = !person.isSelected;
                    if ($scope.signal.connections.indexOf(person.id) == -1) {
                        $scope.signal.connections.push(person.id);
                        $scope.signal.taggedPeople.push(person.smallpicture);
                    } else {
                        var index = $scope.signal.connections.indexOf(person.id);
                        $scope.signal.connections.splice(index, 1);
                        $scope.signal.taggedPeople.splice($scope.signal.taggedPeople.indexOf(person.smallpicture),1);
                    }
                }

                $scope.findPeople = function(peopleSearchText){
                    console.log(peopleSearchText);
                }
                $scope.capitalize = function(text){
                    return _.capitalize(text);
                }
                $scope.updatePeoplePickerResults = function(selectedPeoplePickerGroup){
                    if(selectedPeoplePickerGroup){
                        $scope.selectedGroup = $scope.groupCollection[selectedPeoplePickerGroup.key];
                    }
                }

            }]);
})();