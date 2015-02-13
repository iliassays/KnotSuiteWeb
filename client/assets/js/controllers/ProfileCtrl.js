"use strict";

(function () {
    angular.module('application').controller("ProfileCtrl", ["$scope","$stateParams","ProfileService",
        function ($scope, $stateParams,ProfileService) {
            console.log("da");
            var userId = $stateParams.userId;
            ProfileService.getProfileById(userId).then(function(data){
                console.log(data);
                $scope.userName = data.connData.firstName;
            });
    }]);
})();