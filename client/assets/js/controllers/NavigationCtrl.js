"use strict";
(function(){})(
    angular.module('application').controller("NavigationCtrl",
        ["$scope","LoginService",
            function($scope,LoginService){
             $scope.isLoggedIn = LoginService.isLoggedIn();
    }])
);