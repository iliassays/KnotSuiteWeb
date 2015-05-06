"use strict";
(function(){
    angular.module("application")
        .factory("SignUpService",["ApiService",function(ApiService){
            var register = function(email){
               var data = {
                   email:email,
                   clientURI:""
               };
                return ApiService.post("/api/register",data);
            }
            return{
                register:register
            }
        }]);
})();