"use strict";
(function () {
})(
    angular.module('application').controller("NavigationCtrl",
        ["$scope", "LoginService", "FoundationActionSheet", "EventService", "$location", "ApiService",
            function ($scope, LoginService, FoundationActionSheet, EventService, $location, ApiService) {

                $scope.isLoggedIn = LoginService.isLoggedIn();

                EventService.on('signedIn', function () {
                    $scope.isLoggedIn = LoginService.isLoggedIn();
                });

                $scope.signOut = function () {
                    LoginService.signOut();
                    $scope.isLoggedIn = false;
                    $location.path('/');

                };

                EventService.on('updateProfilePicture', function (event,userData) {
                    $scope.profilePicture = ApiService.apiUrl + '/' + userData.imgSrc;
                    $scope.userName = userData.userName;
                });

            }])
);