"use strict";
(function () {
    angular.module("application")
        .controller("ChatCtrl", ["$scope", "ChatService", "UserContextService", "FoundationApi",
            function ($scope, ChatService, UserContextService, FoundationApi) {

                var chatSocket = ChatService.getChatSocketIo();

                $scope.selectedConversion = {
                    conversation: {},
                    messages: [],
                    newMessage: ''
                };

                var currentUserId = UserContextService.getCurrentUserId();

                FoundationApi.publish('loaderModal', 'open');

                ChatService.getMessageHistory().then(function (response) {
                    if (response.code) {
                        $scope.conversations = response.data;
                        angular.forEach($scope.conversations, function (conversation) {
                            if (conversation.participants[0]._id == currentUserId) {
                                conversation.target = conversation.participants[1];
                            } else {
                                conversation.target = conversation.participants[0];
                            }
                        });

                        $scope.selectedConversion.conversation = $scope.conversations[0];
                        FoundationApi.publish('loaderModal', 'open');
                        ChatService.getMessages($scope.selectedConversion.conversation).then(function (response) {
                            if (response.code) {
                                $scope.selectedConversion.messages = response.data;
                            }
                            FoundationApi.publish('loaderModal', 'close');
                        });
                    }
                });

                UserContextService.getCurrentAccountConnections('').then(function (response) {
                    $scope.personalConnections = response;
                    FoundationApi.publish('loaderModal', 'close');
                });

                $scope.loadAllMessage = function (conversation) {
                    FoundationApi.publish('loaderModal', 'open');
                    $scope.selectedConversion.conversation = conversation;
                    ChatService.getMessages(conversation).then(function (response) {
                        if (response.code) {
                            $scope.selectedConversion.messages = response.data;
                        }
                        FoundationApi.publish('loaderModal', 'close');
                    });
                }

                $scope.sendNewMessage = function (selectedConversation) {
                    FoundationApi.publish('loaderModal', 'open');
                    if (!selectedConversation.conversation._id) {

                        ChatService.createConversation(selectedConversation).then(function (response) {
                               if(response.code){
                                   var conversation = response.data;
                                   if (conversation.participants[0]._id == currentUserId) {
                                       conversation.target = conversation.participants[1];
                                   } else {
                                       conversation.target = conversation.participants[0];
                                   }

                                   selectedConversation.conversation = conversation;

                                   ChatService.sendMessage(selectedConversation)
                                       .then(function(response){
                                           if(response.code){
                                               selectedConversation.messages.push(response.data);
                                           }
                                           conversation.lastMessage = selectedConversation.newMessage;
                                           $scope.conversations.unshift(conversation);
                                           selectedConversation.newMessage = '';
                                           FoundationApi.publish('loaderModal', 'close');
                                       });
                               }
                        });
                    }
                    else{
                        ChatService.sendMessage(selectedConversation)
                            .then(function(response){
                                if(response.code){
                                    selectedConversation.messages.push(response.data);
                                }
                                selectedConversation.newMessage = '';
                                FoundationApi.publish('loaderModal', 'close');
                            });
                    }
                }

                $scope.selectNewPeople = function (connection) {
                    $scope.selectedConversion.conversation = {};
                    $scope.selectedConversion.conversation.target = {
                        _id: connection.id,
                        firstName: connection.title,
                        lastName: ''
                    };
                    $scope.selectedConversion.messages = [];
                    $scope.selectedConversion.newMessage = '';
                }

                chatSocket.on("sisigma_chat_message",function(response){
                    console.log(response);
                });

                chatSocket.on("sisigma_chat_new_conversation",function(response){
                    console.log(response);
                });


            }]);
})();