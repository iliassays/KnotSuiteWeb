"use strict";
(function(){
    angular.module("application")
        .factory("MainHubActivityService",["LoginService", "ApiService", function (LoginService, ApiService){
                var getMainHubActivities = function(orgId,offset){
                    var data = {
                        accessToken:LoginService.getAccessToken(),
                        orgId:orgId,
                        offset:offset,
                        count:10
                    };
                    return ApiService.post('/api/corporateHub/getMainHubActivities', data);
                };

            }]);
})();