"use strict";
(function () {
})(
    angular.module('application').controller("NavigationCtrl",
        ["$scope", "LoginService", "FoundationActionSheet", "EventService", "$location", "ApiService","$rootScope",
            function ($scope, LoginService, FoundationActionSheet, EventService, $location, ApiService,$rootScope) {

                $rootScope.isLoggedIn = LoginService.isLoggedIn();

                EventService.on('signedIn', function () {
                    $rootScope.isLoggedIn = LoginService.isLoggedIn();
                });

                $scope.signOut = function () {
                    LoginService.signOut();
                    $rootScope.isLoggedIn = false;
                    $location.path('/');

                };

                $scope.changeAccountType = function(connection){
                    FoundationActionSheet.deactivate('current-user');
                    $scope.accountType = connection.title;
                    $scope.profilePicture = ApiService.apiUrl+'/'+connection.smallpicture;
                };

                $scope.getPictureUrl = function(connection){
                  return   ApiService.apiUrl+'/'+connection.smallpicture;
                };

                EventService.on('updateProfilePicture', function (event,userData) {
                    $scope.profilePicture = ApiService.apiUrl + '/' + userData.imgSrc;
                    $scope.userName = userData.userName;
                    $scope.accountType = userData.accountType + " Account";
                });

            }])
);