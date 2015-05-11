"use strict";

(function () {
    angular.module('application')
        .service('UserContextService', ["ApiService", function (ApiService) {
            var currentlySignedAsAccount = {
                isPersonalAccount: true,
                accountInfo:{}
            }

            this.getCurrentlySignedAsAccount = function(){
                return currentlySignedAsAccount;
            }

            this.changeCurrentlySignedAsAccount = function(isPersonalAccount, accountInfo){
                currentlySignedAsAccount.isPersonalAccount = isPersonalAccount;
                currentlySignedAsAccount.accountInfo = accountInfo;
            }

            this.getProfileById = function (userId) {
                var data = {
                    accessToken: this.getAccessToken(),
                    id: userId
                }
                return ApiService.post('/personalHub/getProfileById', data);
            };

            this.saveAccessToken = function (accessToken) {
                localStorage["accessToken"] = accessToken;
            };

            this.getAccessToken = function () {
                return localStorage.getItem("accessToken");
            };

            this.isLoggedIn = function () {
                return this.getAccessToken() != null ? true : false;
            };

            this.saveAccountId = function (accountId) {
                localStorage["accountId"] = accountId;
            };

            this.getCurrentUserId = function () {
                if (localStorage["accessToken"] && localStorage["accountId"]) {
                    return localStorage["accountId"];
                }
                return null;
            }

            this.getUserOrganizations = function () {
                var data = {
                    accessToken: LoginService.getAccessToken()
                };
                return ApiService.post('/api/user/getUserOrganizations', data);
            }

            this.personalConnections = function (searchKey) {
                var data = {
                    searchKey: searchKey == "" ? null : searchKey,
                    accessToken: this.getAccessToken(),
                    orgIds: [],
                    includeOrgs: false
                }
                return ApiService.post('/personalHub/personalConnections', data);
            }



            this.saveCurrentUserData = function(currentUserData){
                localStorage["currentUserData"] = JSON.stringify(currentUserData);
                this.saveAccessToken(currentUserData.accessToken);
                this.saveAccountId(currentUserData.accountId);
            }

            this.getPersonalAccountInfo = function(){
                var currentUserData = JSON.parse(localStorage["currentUserData"]);
                return {
                    accountId : currentUserData.accountId,
                    accountType: 'Personal Account',
                    imgSrc: currentUserData.imgSrc,
                    userName : currentUserData.userName,
                    currentUserData: currentUserData
                }
            }

            this.getCorporateConnection = function(){

                var currentUserData = JSON.parse(localStorage["currentUserData"]);
                return currentUserData.corporateConnections;
            }

            this.getAllConnectionsOfUser = function(){
                var data = {
                    accessToken: this.getAccessToken()
                };
                return ApiService.post('/personalHub/getAllConnectionsOfUser', data);
            }

            this.getCurrentAccountConnections = function(searchKey){
                var currentlySignedAs = this.getCurrentlySignedAsAccount();


                if (currentlySignedAs.isPersonalAccount) {
                    var data = {
                        searchKey: searchKey == "" ? null : searchKey,
                        accessToken: this.getAccessToken(),
                        orgIds: [],
                        includeOrgs: false
                    }
                    return ApiService.post('/personalHub/personalConnections', data);

                } else {

                    var data = {
                        searchKey: searchKey == "" ? null : searchKey,
                        accessToken: this.getAccessToken(),
                        orgIds: [currentlySignedAs.accountInfo.id],
                        includeOrgs: false
                    }
                    return ApiService.post('/api/connections/getAllEmployeesOfOrgs', data);
                }
            }

            this.getUserOwnedOrganization = function(){
                var data = {
                    accessToken: this.getAccessToken()
                };
                return ApiService.post('/personalHub/corporateConnections', data);
            }

        }]);
})();

