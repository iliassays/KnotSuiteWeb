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

            var nominateAward = function(award){
                award.accessToken = UserContextService.getAccessToken();
                return ApiService.post('/api/nominateAward',award);
            }

            return{
                getAllAwards: getAllAwards,
                getNominatedAwardById: getNominatedAwardById,
                nominateAward:nominateAward
            }
        }]);
})();