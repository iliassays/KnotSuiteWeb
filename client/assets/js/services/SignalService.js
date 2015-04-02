"use strict";
(function () {
    angular.module("application").
        factory("SignalService",
        ["UserContextService", "ApiService", function (UserContextService, ApiService) {
            var getConnections = function (searchKey) {

                var currentlySignedAs = UserContextService.getCurrentlySignedAsAccount();

                if (currentlySignedAs.isPersonalAccount) {
                    var data = {
                        searchKey: searchKey == "" ? null : searchKey,
                        accessToken: UserContextService.getAccessToken(),
                        orgIds: [],
                        includeOrgs: false
                    }
                    return ApiService.post('/personalHub/personalConnections', data);

                } else {
                    var data = {
                        searchKey: searchKey == "" ? null : searchKey,
                        accessToken: UserContextService.getAccessToken(),
                        orgIds: [currentlySignedAs.accountId],
                        includeOrgs: false
                    }
                    return ApiService.post('/api/connections/getAllEmployeesOfOrgs', data);
                }
            }

            var getSignals = function (offset) {
                var currentlySignedAs = UserContextService.getCurrentlySignedAsAccount();
                var data = {
                    accessToken: UserContextService.getAccessToken(),
                    orgId: currentlySignedAs.isPersonalAccount == true ? null : currentlySignedAs.accountInfo.id,
                    offset: offset,
                    count: 10
                };
                return ApiService.post('/corporateHub/getMainHubActivities', data);
            };

            var saveFeedback = function (fbType,signalId){
                var data = {
                    accessToken: UserContextService.getAccessToken(),
                    signalId: signalId,
                    fbType: fbType
                };
                return ApiService.post('/api/signals/saveFeedback', data);
            }

            return {
                getConnections: getConnections,
                getSignals: getSignals,
                saveFeedback:saveFeedback
            }
        }]);
})();