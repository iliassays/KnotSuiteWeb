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
                        orgIds: [currentlySignedAs.id],
                        includeOrgs: false
                    }
                    console.log(data);
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

            var saveFeedback = function (fbType, signalId) {
                var data = {
                    accessToken: UserContextService.getAccessToken(),
                    signalId: signalId,
                    fbType: fbType
                };
                return ApiService.post('/api/signals/saveFeedback', data);
            }

            var attachNewFileMobile = function (attachment) {
                var data = {
                    filename: attachment.name,
                    fileBase64: attachment.fileBase64,
                    accessToken: UserContextService.getAccessToken()
                }
                return ApiService.post('/api/signals/attachFile_Mobile',data);
            }

            var saveComment = function(signal){
                var data = {
                    accessToken: UserContextService.getAccessToken(),
                    content: signal.newComment.message,
                    spaceId: null,
                    rootId: signal.doc._id,
                    verb: "commented",
                    object: null,
                    activityType: signal.doc.activityType,
                    objectTags: {
                        objectTags: [
                        ],
                        hashTags: [],
                        privateTags: []
                    },
                    ogdataObject: null,
                    attachments:  signal.newComment.attachemntUrls,
                    orgId: null,
                    visibility: {
                        scope: "Self",
                        privacy: "AllConnection"
                    }
                };
                return ApiService.post('/api/signals/saveSignal',data);
            }

            return {
                getConnections: getConnections,
                getSignals: getSignals,
                saveFeedback: saveFeedback,
                attachNewFileMobile:attachNewFileMobile,
                saveComment:saveComment
            }
        }]);
})();