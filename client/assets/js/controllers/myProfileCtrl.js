"use strict";
(function () {
    angular.module('application').controller('myProfileCtrl',
        ["$scope",
            "UserContextService",
            "ApiService",
            "LoginService",
            "$location",
            "DummyDataService",
            "$state",
            "MixPanelService",
            "SignalService", "EventService",
            function ($scope, UserContextService, ApiService, LoginService, $location, DummyDataService, $state, MixPanelService, SignalService, EventService) {
                MixPanelService.track("My Profile");
                var userId = UserContextService.getCurrentUserId();
                $state.go('myProfile.signal');
                $scope.signal = {
                    content: '',
                    taggedPeople: [],
                    attachments: []
                };

                $scope.groupCollection = {};

                $scope.signalOffSet = 0;

                UserContextService.getProfileById(userId).then(function (data) {
                    $scope.myPhoto = data.connData.imgSrc;
                    $scope.myName = data.connData.firstName + " " + data.connData.lastName;
                    $scope.myEmail = data.connData.email;
                });

                SignalService.getSignals($scope.signalOffSet).then(function (signals) {
                    console.log(signals);
                    $scope.signals = [];
                    angular.forEach(signals.data, function (signal) {
                        if (signal.hasOwnProperty('doc')) {
                            signal.newComment = {};
                            signal.newComment.attachemnts = [];
                            $scope.signals.push(signal);
                        }
                    });
                });

                EventService.on('onBodyScroll', function (event) {

                });

                $scope.onAttachmentChange = function (attachment) {
                    var attachment = event.target.files[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var attachmentData = fileLoadedEvent.target.result.replace(/^data(.*?),/, '');
                        $scope.signal.attachments.push({
                            fileName: attachment.name,
                            attachmentContent: attachmentData
                        });
                        $scope.$apply();
                        console.log($scope.signal.attachments);
                    }
                    fileReader.readAsDataURL(attachment);
                };

                $scope.removeAttachment = function (attachment) {
                    var attachmentIndex = $scope.signal.attachments.indexOf(attachment);
                    $scope.signal.attachments.splice(attachmentIndex, 1);
                }

                $scope.showPeoplePicker = function () {
                    SignalService.getConnections().then(function (connections) {
                        $scope.peoplePickerFlag = true;

                        $scope.groupCollection["connType"] = _.groupBy(connections, function (m) {
                            return m.connType;
                        });
                        $scope.groupCollection["entityType"] = _.groupBy(connections, function (m) {
                            return m.entityType;
                        });
                        $scope.groupCollection["nameType"] = _.groupBy(connections, function (m) {
                            return m.title.charAt(0);
                        });

                        if ($scope.selectedPeoplePickerGroup) {
                            $scope.selectedGroup = $scope.groupCollection[$scope.selectedPeoplePickerGroup.key];
                        } else {
                            $scope.selectedGroup = $scope.groupCollection["nameType"];
                        }
                    });
                };

                $scope.toggleSelectPeople = function (person) {
                    person.isSelected = !person.isSelected;

                    if ($scope.signal.taggedPeople.indexOf(person) == -1) {
                        $scope.signal.taggedPeople.push(person);
                    } else {
                        $scope.signal.taggedPeople.splice($scope.signal.taggedPeople.indexOf(person), 1);
                    }
                }

                $scope.findPeople = function (peopleSearchText) {
                    console.log(peopleSearchText);
                }

                $scope.updatePeoplePickerResults = function (selectedPeoplePickerGroup) {
                    if (selectedPeoplePickerGroup) {
                        $scope.selectedGroup = $scope.groupCollection[selectedPeoplePickerGroup.key];
                    }
                }

                $scope.postSignal = function (signal) {
                    // console.log(signal);
                }

                $scope.commented = function (data) {
                    return data.replace(/<\/?(user)\b[^<>]*>/g, "");
                }

                $scope.saveDisLike = function (signal) {
                    SignalService.saveFeedback('n', signal._id)
                        .then(function (response) {
                            if (response.code) {
                                signal.fbYes = response.data.fbYes;
                                signal.fbNo = response.data.fbNo;
                            }
                        });
                    ;
                }

                $scope.saveLike = function (signal) {
                    SignalService.saveFeedback('y', signal._id)
                        .then(function (response) {
                            if (response.code) {
                                signal.fbYes = response.data.fbYes;
                                signal.fbNo = response.data.fbNo;
                            }
                        });
                }

                $scope.loadMoreSignal = function () {
                    $scope.signalOffSet += 10;
                    SignalService.getSignals($scope.signalOffSet).then(function (signals) {
                        angular.forEach(signals.data, function (signal) {
                            if (signal.hasOwnProperty('doc')) {
                                $scope.signals.push(signal);
                            }
                        });
                    });
                }

                $scope.onCommentAttachmentChange = function (signal) {
                    var attachments = event.target.files;
                    angular.forEach(attachments, function (attachment) {
                        var fileReader = new FileReader();
                        fileReader.onload = function (fileLoadedEvent) {
                            var attachmentData = fileLoadedEvent.target.result.replace(/^data(.*?),/, '');
                            signal.newComment.attachemnts.push({name: attachment.name, fileBase64: attachmentData});
                            $scope.$apply();
                            console.log(signal.newComment.attachemnts);
                        }
                        fileReader.readAsDataURL(attachment);
                    });
                }

                $scope.saveNewComment = function (signal) {

                    signal.newComment.attachemntUrls = [];

                    if(signal.newComment.attachemnts.length==0){
                        SignalService.saveComment(signal).then(function (response) {
                            console.log(response);
                            if (response.code) {
                                signal.comments.push(response.data);
                                signal.newComment = {};
                                signal.newComment.attachemnts = [];
                            }
                        });
                        return;
                    }


                    angular.forEach(signal.newComment.attachemnts, function (attachment) {
                        SignalService.attachNewFileMobile(attachment).then(function (response) {

                            console.log(response);

                            signal.newComment.attachemntUrls.push(response.url);

                            console.log(signal.newComment.attachemnts.length);
                            console.log(signal.newComment.attachemnts.length);

                            if (signal.newComment.attachemntUrls.length == signal.newComment.attachemnts.length) {
                                SignalService.saveComment(signal).then(function (response) {
                                    console.log(response);
                                    if (response.code) {
                                        signal.comments.push(response.data);
                                        signal.newComment = {};
                                        signal.newComment.attachemnts = [];
                                    }
                                });
                            }

                        });
                    });
                }


                $scope.removeNewCommentAttachment = function (attachment, signal) {
                    signal.newComment.attachemnts.splice(signal.newComment.attachemnts.indexOf(attachment), 1);
                }

            }]);
})();