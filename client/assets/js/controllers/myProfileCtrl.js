"use strict";
(function () {
    angular.module('application').controller('myProfileCtrl',
        ["$scope", "ProfileService", "ApiService", "LoginService", "$location","DummyDataService","$state",
            function ($scope, ProfileService, ApiService, LoginService, $location,DummyDataService,$state) {
                var userId = LoginService.getCurrentUserId();
                $state.go('myProfile.signal');
                $scope.signal = {
                    content:'',
                    taggedPeople : [],
                    attachments:[]
                };

                $scope.groupCollection = {};

                ProfileService.getProfileById(userId).then(function (data) {
                    $scope.myPhoto = ApiService.apiUrl + '/' + data.connData.imgSrc;
                    $scope.myName = data.connData.firstName + " " + data.connData.lastName;
                    $scope.myEmail = data.connData.email;
                });

                $scope.onAttachmentChange = function (attachment) {
                    var  attachment = event.target.files[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var attachmentData = fileLoadedEvent.target.result.replace(/^data(.*?),/,'');
                        $scope.signal.attachments.push({
                            fileName:attachment.name,
                            attachmentContent: attachmentData
                        });
                        $scope.$apply();
                        console.log($scope.signal.attachments);
                    }
                    fileReader.readAsDataURL(attachment);
                };
                $scope.removeAttachment = function(attachment){
                    var attachmentIndex = $scope.signal.attachments.indexOf(attachment);
                    $scope.signal.attachments.splice(attachmentIndex,1);
                }

                $scope.showPeoplePicker = function () {
                    var data = DummyDataService.getConnection();
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

                    if ($scope.signal.taggedPeople.indexOf(person) == -1) {
                        $scope.signal.taggedPeople.push(person);
                    } else {
                        $scope.signal.taggedPeople.splice($scope.signal.taggedPeople.indexOf(person),1);
                    }
                }

                $scope.findPeople = function(peopleSearchText){
                    console.log(peopleSearchText);
                }

                $scope.updatePeoplePickerResults = function(selectedPeoplePickerGroup){
                    if(selectedPeoplePickerGroup){
                        $scope.selectedGroup = $scope.groupCollection[selectedPeoplePickerGroup.key];
                    }
                }

                $scope.postSignal = function(signal){
                   // console.log(signal);
                }

            }]);
})();