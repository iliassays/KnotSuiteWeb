"use strict";
(function () {
    angular.module('application')
        .factory('LoginService', ["ApiService", function (ApiService) {
            var saveAccessToken = function (accessToken) {
                localStorage["accessToken"] = accessToken;
            };

            var signOut = function () {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("accountId");
            };

            var getAccessToken = function () {
                return localStorage.getItem("accessToken");
            };

            var sendLoginRequest = function (data) {
                return ApiService.post("/api/login", data);
            };

            var isLoggedIn = function () {
                return getAccessToken() != null ? true : false;
            };

            var saveAccountId = function(accountId){
                localStorage["accountId"] = accountId;
            };

            var getCurrentUserId = function(){
                if(localStorage["accessToken"]&&localStorage["accountId"]){
                    return localStorage["accountId"];
                }
                return null;
            }

            return {
                sendLoginRequest: sendLoginRequest,
                saveAccessToken: saveAccessToken,
                signOut: signOut,
                getAccessToken: getAccessToken,
                isLoggedIn: isLoggedIn,
                saveAccountId:saveAccountId,
                getCurrentUserId:getCurrentUserId
            };
        }]);
})();