"use strict";
(function(){})(
    angular.module('application').controller("NavigationCtrl",
        ["$scope","LoginService","FoundationActionSheet",
            function($scope,LoginService,FoundationActionSheet){
             $scope.isLoggedIn = LoginService.isLoggedIn();

    }])
);