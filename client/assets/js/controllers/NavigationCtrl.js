"use strict";
(function () {
})(
    angular.module('application').controller("NavigationCtrl",
        ["$scope", "UserContextService", "FoundationActionSheet", "EventService", "$location", "ApiService", "$rootScope", "LoginService",
            function ($scope, UserContextService, FoundationActionSheet, EventService, $location, ApiService, $rootScope, LoginService) {

                $rootScope.isLoggedIn = UserContextService.isLoggedIn();

                EventService.on('signedIn', function () {
                    $rootScope.isLoggedIn = UserContextService.isLoggedIn();

                    $scope.corporateConnections = UserContextService.getCorporateConnection();
                    $scope.personalAccountInfo = UserContextService.getPersonalAccountInfo();
                    UserContextService.changeCurrentlySignedAsAccount(true, $scope.personalAccountInfo);
                });

                $scope.signOut = function () {
                    LoginService.signOut();
                    $rootScope.isLoggedIn = false;
                    $location.path('/');

                };

                $scope.changeAccountType = function (connection) {
                    FoundationActionSheet.deactivate('current-user');
                    $scope.accountType = connection.title;
                    $scope.profilePicture = ApiService.getProfileThumbnail(connection.id,60,true);
                    $scope.currentUser = connection;
                    UserContextService.changeCurrentlySignedAsAccount(false, connection);
                    $location.path('/');
                };

                $scope.changePersonalAccount = function () {
                    FoundationActionSheet.deactivate('current-user');
                    $scope.accountType = $scope.personalAccountInfo.userName;
                    $scope.profilePicture = ApiService.getProfileThumbnail($scope.personalAccountInfo.accountId,60,false);
                   // $scope.currentUser = $scope.personalAccountInfo;
                    UserContextService.changeCurrentlySignedAsAccount(true, $scope.personalAccountInfo);
                    $location.path('/');
                }

                $scope.getPictureUrl = function (pictureUrl) {
                    //console.log(pictureUrl);
                    return ApiService.apiUrl + '/' + pictureUrl;
                };

                EventService.on('updateProfilePicture', function (event, userData) {
                    $scope.profilePicture = ApiService.getProfileThumbnail($scope.personalAccountInfo.accountId,60,false);
                    $scope.userName = userData.userName;
                    $scope.accountType = userData.accountType + " Account";
                });

            }])
);