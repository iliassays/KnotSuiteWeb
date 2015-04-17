"use strict";
(function () {
    angular.module("application")
        .factory("ChatService", ["ApiService","UserContextService", function (ApiService,UserContextService) {
            var getMessageHistory = function () {
                var data = {
                    actorId: UserContextService.getCurrentUserId(),
                    accessToken: UserContextService.getAccessToken()
                };
                return ApiService.post('/messages/getMessageHistory',data,ApiService.chatServerUrl);
            };

            return{
                getMessageHistory:getMessageHistory
            }
        }]);
})();