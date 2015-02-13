"use strict";
(function() {
angular.module('application')
    .factory('LoginService',["ApiService",function(ApiService){
        var saveAccessToken = function(accessToken){
            localStorage["accessToken"] = accessToken;
        };

        var clearAccessToken = function() {
            localStorage.removeItem("accessToken");
        };

        var getAccessToken = function() {
            return localStorage.getItem("accessToken");
        };

        var sendLoginRequest = function(data){
              return ApiService.post("/api/login",data);
        };

        return{
                sendLoginRequest:sendLoginRequest,
                saveAccessToken:saveAccessToken,
                clearAccessToken:clearAccessToken,
                getAccessToken:getAccessToken
        };
}]);
})();