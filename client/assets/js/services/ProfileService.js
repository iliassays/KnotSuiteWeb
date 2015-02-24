"use strict";

(function () {
    angular.module('application')
        .factory('ProfileService', ["LoginService", "ApiService", function (LoginService, ApiService) {

            var getProfileById = function (userId) {
                var data = {
                    accessToken: LoginService.getAccessToken(),
                    id: userId
                }
                return ApiService.post('/personalHub/getProfileById', data);
            };

            var getUserOrganizations =function(){
                var data ={
                    accessToken: LoginService.getAccessToken()
                };
                return ApiService.post('/api/user/getUserOrganizations', data);
            }

            return{
                getProfileById:getProfileById
            }
        }]);
})();

