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
            "SignalService", "EventService", "FoundationApi",
            function ($scope, UserContextService, ApiService, LoginService,
                      $location, DummyDataService, $state, MixPanelService,
                      SignalService, EventService, FoundationApi) {
                MixPanelService.track("My Profile");

                var userId = UserContextService.getCurrentUserId();

                $state.go('myProfile.signal');
                $scope.signal = {
                    content: '',
                    taggedPeople: [],
                    attachments: []
                };
                $scope.peoplePickerFlag = false;

                $scope.groupCollection = {};

                $scope.signalOffSet = 0;
                FoundationApi.publish('loaderModal', 'open');

                UserContextService.getProfileById(userId).then(function (data) {
                    $scope.currentUserId = data.connData._id;
                    $scope.myName = data.connData.firstName + " " + data.connData.lastName;
                    $scope.myEmail = data.connData.email;
                });

                SignalService.getSignals($scope.signalOffSet).then(function (signals) {
                    $scope.signals = [];
                    angular.forEach(signals.data, function (signal) {
                        if (signal.hasOwnProperty('doc')) {
                            signal.newComment = {
                                attachments: [],
                                people: [],
                                taggedPeople: [],
                                caretPosition: 0,
                                message:''
                            };
                            $scope.signals.push(signal);
                        }
                    });
                    FoundationApi.publish('loaderModal', 'close');
                });

                EventService.on('onBodyScroll', function (event) {

                });

                $scope.onAttachmentChange = function (attachment) {
                    var attachments = window.event.target.files;

                    angular.forEach(attachments, function (attachment) {
                        var fileReader = new FileReader();
                        fileReader.onload = function (fileLoadedEvent) {
                            var attachmentData = fileLoadedEvent.target.result.replace(/^data(.*?),/, '');
                            $scope.signal.attachments.push({
                                name: attachment.name,
                                fileBase64: attachmentData
                            });
                            $scope.$apply();
                        }
                        fileReader.readAsDataURL(attachment);
                    });
                };

                $scope.removeAttachment = function (attachment) {
                    var attachmentIndex = $scope.signal.attachments.indexOf(attachment);
                    $scope.signal.attachments.splice(attachmentIndex, 1);
                }

                $scope.showPeoplePicker = function () {
                    if(!$scope.peoplePickerFlag ){
                        FoundationApi.publish('loaderModal', 'open');
                        SignalService.getConnections().then(function (connections) {
                            $scope.peoplePickerFlag = true;
                            angular.forEach(connections,function(connection){
                                var isExists = _.find($scope.signal.taggedPeople,{id:connection.id});
                                if (isExists) {
                                    connection.isSelected = true;
                                }
                            });

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
                            FoundationApi.publish('loaderModal', 'close');
                        });
                    }else{
                        $scope.peoplePickerFlag = !$scope.peoplePickerFlag;
                    }
                };

                $scope.hidePeoplePicker = function () {
                    if($scope.peoplePickerFlag ){
                        $scope.peoplePickerFlag = false;
                    }
                }

                $scope.showBottomPart = function () {
                    if ($scope.peoplePickerFlag) {
                        $scope.peoplePickerFlag = false;
                    }
                }

                $scope.toggleSelectPeople = function (person) {
                    person.isSelected = !person.isSelected;
                    var isExists = _.find($scope.signal.taggedPeople,{id:person.id});
                    if (!isExists) {
                        $scope.signal.taggedPeople.push(person);
                    } else {
                        $scope.signal.taggedPeople.splice($scope.signal.taggedPeople.indexOf(isExists), 1);
                    }
                }

                $scope.findPeople = function (peopleSearchText) {

                }

                $scope.updatePeoplePickerResults = function (selectedPeoplePickerGroup) {
                    if (selectedPeoplePickerGroup) {
                        $scope.selectedGroup = $scope.groupCollection[selectedPeoplePickerGroup.key];
                    }
                }

                $scope.postSignal = function (signal) {
                    FoundationApi.publish('loaderModal', 'open');
                    signal.attachmentUrl = [];
                    if (!signal.attachments.length) {
                        SignalService.saveSignal(signal)
                            .then(function (response) {

                                var newSignal = {
                                    doc: response.data,
                                    newComment: {
                                        attachments: [],
                                        taggedPeople:[],
                                        message:''
                                    },
                                    comments: []
                                }

                                $scope.signals.unshift(newSignal);

                                $scope.signal = {
                                    content: '',
                                    taggedPeople: [],
                                    attachments: [],
                                    attachmentUrl: []
                                };
                                FoundationApi.publish('loaderModal', 'close');

                            });
                    } else {
                        angular.forEach(signal.attachments, function (attachment) {
                            SignalService.attachNewFileMobile(attachment).then(function (response) {

                                signal.attachmentUrl.push(response.url);

                                if (signal.attachmentUrl.length == signal.attachments.length) {
                                    SignalService.saveSignal(signal).then(function (response) {
                                        var newSignal = {
                                            doc: response.data,
                                            newComment: {
                                                attachments: [],
                                                taggedPeople:[],
                                                message:''
                                            },
                                            comments: []
                                        }
                                        $scope.signals.unshift(newSignal);
                                        $scope.signal = {
                                            content: '',
                                            taggedPeople: [],
                                            attachments: [],
                                            attachmentUrl: []
                                        };
                                        FoundationApi.publish('loaderModal', 'close');
                                    });
                                }

                            });
                        });
                    }
                }

                $scope.saveDisLike = function (signal) {
                    FoundationApi.publish('loaderModal', 'open');
                    SignalService.saveFeedback('n', signal._id)
                        .then(function (response) {
                            if (response.code) {
                                signal.fbYes = response.data.fbYes;
                                signal.fbNo = response.data.fbNo;
                            }
                            FoundationApi.publish('loaderModal', 'close');
                        });
                    ;
                }

                $scope.saveLike = function (signal) {
                    FoundationApi.publish('loaderModal', 'open');
                    SignalService.saveFeedback('y', signal._id)
                        .then(function (response) {
                            if (response.code) {
                                signal.fbYes = response.data.fbYes;
                                signal.fbNo = response.data.fbNo;
                            }
                            FoundationApi.publish('loaderModal', 'close');
                        });
                }

                $scope.loadMoreSignal = function () {
                    FoundationApi.publish('loaderModal', 'open');
                    $scope.signalOffSet += 10;
                    SignalService.getSignals($scope.signalOffSet).then(function (signals) {
                        angular.forEach(signals.data, function (signal) {
                            if (signal.hasOwnProperty('doc')) {
                                $scope.signals.push(signal);
                            }
                        });
                        FoundationApi.publish('loaderModal', 'close');
                    });
                }

                $scope.onCommentAttachmentChange = function (signal) {
                    var attachments = window.event.target.files;
                    angular.forEach(attachments, function (attachment) {
                        var fileReader = new FileReader();
                        fileReader.onload = function (fileLoadedEvent) {
                            var attachmentData = fileLoadedEvent.target.result.replace(/^data(.*?),/, '');
                            signal.newComment.attachments.push({name: attachment.name, fileBase64: attachmentData});
                            $scope.$apply();
                        }
                        fileReader.readAsDataURL(attachment);
                    });
                }

                $scope.saveNewComment = function (signal) {
                    FoundationApi.publish('loaderModal', 'open');

                    signal.newComment.attachmentUrls = [];

                    if (signal.newComment.attachments.length == 0) {
                        SignalService.saveComment(signal).then(function (response) {
                            if (response.code) {
                                signal.comments.push(response.data);
                                signal.newComment = {};
                                signal.newComment.attachments = [];
                                signal.newComment.attachmentUrls = [];
                                signal.newComment.taggedPeople = [];
                                signal.newComment.message = '';
                            }
                            FoundationApi.publish('loaderModal', 'close');
                        });
                        return;
                    }

                    angular.forEach(signal.newComment.attachments, function (attachment) {
                        SignalService.attachNewFileMobile(attachment).then(function (response) {

                            signal.newComment.attachmentUrls.push(response.url);

                            if (signal.newComment.attachmentUrls.length == signal.newComment.attachments.length) {
                                SignalService.saveComment(signal).then(function (response) {
                                    if (response.code) {
                                        signal.comments.push(response.data);
                                        signal.newComment = {};
                                        signal.newComment.attachments = [];
                                        signal.newComment.attachmentUrls = [];
                                        signal.newComment.taggedPeople = [];
                                        signal.newComment.message = '';
                                    }
                                    FoundationApi.publish('loaderModal', 'close');
                                });
                            }

                        });
                    });
                }

                $scope.removeNewCommentAttachment = function (attachment, signal) {
                    signal.newComment.attachments.splice(signal.newComment.attachments.indexOf(attachment), 1);
                }

                $scope.showMiniPeoplePickerInComment = function ($event, newComment) {
                    if(newComment.message.substr($event.currentTarget.selectionStart -1, $event.currentTarget.selectionStart) == ''){
                        newComment.caretPosition = $event.currentTarget.selectionStart;
                        newComment.showMiniPeoplePicker = true;
                        FoundationApi.publish('loaderModal', 'open');
                        SignalService.getConnections().then(function (connections) {
                            newComment.people = connections;
                            FoundationApi.publish('loaderModal', 'close');
                        });
                    }
                }


            }]);
})();