"use strict";
(function(){
    angular.module("application")
        .factory("AwardService",["ApiService","UserContextService",function(ApiService,UserContextService){
            var url = "";
            var getAllAwards = function(){
                var data = {
                    accessToken: UserContextService.getAccessToken()
                };
                return ApiService.post('/api/getAllAwards',data);
            }

            var getNominatedAwardById = function(userId){
                var data ={
                    userId: userId,
                    accessToken : UserContextService.getAccessToken()
                };
                return ApiService.post('/api/getNominatedAwardsByUserId',data);
            }

            return{
                getAllAwards: getAllAwards,
                getNominatedAwardById: getNominatedAwardById
            }
        }]);
})();