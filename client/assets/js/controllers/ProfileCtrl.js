"use strict";

(function () {
    angular.module('application').controller("ProfileCtrl", ["$scope","$stateParams","ProfileService","$state",
        function ($scope, $stateParams,ProfileService,$state) {
            console.log("da");
            var userId = $stateParams.userId;
            ProfileService.getProfileById(userId).then(function(data){
                console.log(data);
                $scope.userName = data.connData.firstName;
               // $urlRouterProvider.path('/personalSettings');
                $state.go('profile.personalSettings');
            });
    }]);
})();