"use strict";
(function () {
})(
    angular.module('application').controller("NavigationCtrl",
        ["$scope", "UserContextService", "FoundationActionSheet",
            "EventService", "$location", "ApiService", "$rootScope", "LoginService","FoundationApi",
            function ($scope, UserContextService, FoundationActionSheet,
                      EventService, $location, ApiService, $rootScope, LoginService,FoundationApi) {

                $rootScope.isLoggedIn = UserContextService.isLoggedIn();

                $scope.signOut = function () {
                    LoginService.signOut();
                    $rootScope.isLoggedIn = false;
                    $location.path('/');

                };

                $scope.changeAccountType = function (connection) {
                    FoundationActionSheet.deactivate('current-user');
                    $scope.accountType = connection.title;
                    $scope.profilePic = ApiService.getProfileThumbnail(connection.id,60,true);
                    $scope.currentUser = connection;
                    UserContextService.changeCurrentlySignedAsAccount(false, connection);
                    $location.path('/');
                };

                $scope.changePersonalAccount = function () {
                    FoundationActionSheet.deactivate('current-user');
                    $scope.accountType = $scope.personalAccountInfo.userName;
                    $scope.profilePic = ApiService.getProfileThumbnail($scope.personalAccountInfo.accountId,60,false);
                    $scope.currentUser = $scope.personalAccountInfo;
                    UserContextService.changeCurrentlySignedAsAccount(true, $scope.personalAccountInfo);
                   $location.path('/');
                }


                $scope.openCreateOrgModal = function(){
                    FoundationApi.publish('createOrgModal', 'open');
                    FoundationActionSheet.deactivate('current-user');
                };

                EventService.on('updateProfilePicture', function (event, userData) {
                    $scope.profilePic = ApiService.getProfileThumbnail($scope.personalAccountInfo.accountId,60,false);
                    $scope.userName = userData.userName;
                    $scope.accountType = userData.accountType + " Account";
                });

                EventService.on('signedIn', function () {
                    $rootScope.isLoggedIn = UserContextService.isLoggedIn();
                    $scope.corporateConnections = UserContextService.getCorporateConnection();
                    $scope.personalAccountInfo = UserContextService.getPersonalAccountInfo();
                    UserContextService.changeCurrentlySignedAsAccount(true, $scope.personalAccountInfo);
                });

            }])
);