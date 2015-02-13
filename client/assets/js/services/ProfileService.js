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

            return{
                getProfileById:getProfileById
            }
        }]);
})();

