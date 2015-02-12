"use strict";
(function() {
angular.module('application')
    .factory('LoginService',["ApiService",function(ApiService){
    var sendLoginRequest = function(data){
        return ApiService.post("/api/login",data);
    };
    return{
        sendLoginRequest:sendLoginRequest
    };
}]);
})();