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

            var getUserOrganizations = function () {
                var data = {
                    accessToken: LoginService.getAccessToken()
                };
                return ApiService.post('/api/user/getUserOrganizations', data);
            }

            var personalConnections = function (searchKey) {
                var data = {
                    searchKey: searchKey == "" ? null : searchKey,
                    accessToken: LoginService.getAccessToken(),
                    orgIds: [],
                    includeOrgs: false
                }
                return ApiService.post('/personalHub/personalConnections', data);
            }

            return {
                getProfileById: getProfileById,
                personalConnections:personalConnections,
                getUserOrganizations:getUserOrganizations
            }
        }]);
})();

