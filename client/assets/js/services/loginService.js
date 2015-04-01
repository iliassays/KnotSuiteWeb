"use strict";
(function () {
    angular.module('application')
        .factory('LoginService', ["ApiService", function (ApiService) {

            var signOut = function () {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("accountId");
            };

            var sendLoginRequest = function (data) {
                return ApiService.post("/api/login", data);
            };

            return {
                sendLoginRequest: sendLoginRequest,
                signOut: signOut
            };
        }]);
})();