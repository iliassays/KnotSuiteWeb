"use strict";
(function(){
    angular.module("application")
        .controller("ChatCtrl",["$scope","ChatService","UserContextService","FoundationApi",
            function($scope,ChatService,UserContextService,FoundationApi){

            //ChatService.getMessageHistory().then(function(response){
            //    console.log(response);
            //    if(response.code){
            //        $scope.messages = response.data;
            //    }
            //});
                FoundationApi.publish('loaderModal', 'open');
                UserContextService.personalConnections().then(function(response){
                    $scope.personalConnections = response;
                    FoundationApi.publish('loaderModal', 'close');
                });

            //$scope.messages = [
            //    {
            //        "unreadCount": 0,
            //        "__v": 0,
            //        "_id": "55268e93ff2e210300ac3558",
            //        "lastMessage": "can I leave for today as Mun Mun da is working on eassyscram?",
            //        "creationDate": "2015-04-09T14:37:07.178Z",
            //        "lastMessageDate": "2015-04-10T15:56:31.275Z",
            //        "participants": [
            //            {
            //                "_id": "545aebb533882c020000003b",
            //                "firstName": "Mohammad",
            //                "lastName": "Faisal"
            //            },
            //            {
            //                "_id": "54db0897c92ceb03000000ed",
            //                "firstName": "Atish",
            //                "lastName": "Dipongkor"
            //            }
            //        ]
            //    },
            //    {
            //        "unreadCount": 0,
            //        "__v": 0,
            //        "_id": "55265e15ff2e210300ac3545",
            //        "lastMessage": "Test",
            //        "creationDate": "2015-04-09T11:10:13.247Z",
            //        "lastMessageDate": "2015-04-09T11:10:13.973Z",
            //        "participants": [
            //            {
            //                "_id": "54db04d1c92ceb03000000da",
            //                "firstName": "Ilias",
            //                "lastName": "Hossain"
            //            },
            //            {
            //                "_id": "54db0897c92ceb03000000ed",
            //                "firstName": "Atish",
            //                "lastName": "Dipongkor"
            //            }
            //        ]
            //    },
            //    {
            //        "unreadCount": 0,
            //        "__v": 0,
            //        "_id": "552250edbac0430300e905e5",
            //        "lastMessage": "Test2",
            //        "creationDate": "2015-04-06T09:25:01.065Z",
            //        "lastMessageDate": "2015-04-06T09:56:02.559Z",
            //        "participants": [
            //            {
            //                "_id": "54db04d1c92ceb03000000da",
            //                "firstName": "Ilias",
            //                "lastName": "Hossain"
            //            },
            //            {
            //                "_id": "54db0897c92ceb03000000ed",
            //                "firstName": "Atish",
            //                "lastName": "Dipongkor"
            //            }
            //        ]
            //    },
            //    {
            //        "unreadCount": 0,
            //        "__v": 0,
            //        "_id": "551a69d7d186eb0300186487",
            //        "lastMessage": "cors is enabled for all-domains right now (no filtering applied).\nSo, service should be accesible from your above mentioned domains.\nIf, there's problem while accessing, plz inform.",
            //        "creationDate": "2015-03-31T09:33:11.805Z",
            //        "lastMessageDate": "2015-04-01T02:46:45.105Z",
            //        "participants": [
            //            {
            //                "_id": "5448a17f24d7ab020000007d",
            //                "firstName": "Syed Sirazus",
            //                "lastName": "Salehein"
            //            },
            //            {
            //                "_id": "54db0897c92ceb03000000ed",
            //                "firstName": "Atish",
            //                "lastName": "Dipongkor"
            //            }
            //        ]
            //    },
            //    {
            //        "unreadCount": 0,
            //        "__v": 0,
            //        "_id": "54e80ce01e1afd03000000b9",
            //        "lastMessage": "Atish, can you visit the azure portal and tell me what minimum things we need. I am kind of lost.",
            //        "creationDate": "2015-02-21T04:43:12.990Z",
            //        "lastMessageDate": "2015-03-25T09:43:13.980Z",
            //        "participants": [
            //            {
            //                "_id": "545aebb533882c020000003b",
            //                "firstName": "Mohammad",
            //                "lastName": "Faisal"
            //            },
            //            {
            //                "_id": "54db0897c92ceb03000000ed",
            //                "firstName": "Atish",
            //                "lastName": "Dipongkor"
            //            }
            //        ]
            //    },
            //    {
            //        "unreadCount": 0,
            //        "__v": 0,
            //        "_id": "54f564629626f00300000075",
            //        "lastMessage": "Comment given. Which part I will work today?",
            //        "creationDate": "2015-03-03T07:36:02.355Z",
            //        "lastMessageDate": "2015-03-03T07:36:02.703Z",
            //        "participants": [
            //            {
            //                "_id": "54db04d1c92ceb03000000da",
            //                "firstName": "Ilias",
            //                "lastName": "Hossain"
            //            },
            //            {
            //                "_id": "54db0897c92ceb03000000ed",
            //                "firstName": "Atish",
            //                "lastName": "Dipongkor"
            //            }
            //        ]
            //    }
            //];

            //$scope.getProfilePictureThumbnail = function(id){
            //    return 'http://prod-cdn.herokuapp.com/getProfilePictureThumbnail/'+id+
            //        '/100/profile.jpg';
            //}

        }]);
})();