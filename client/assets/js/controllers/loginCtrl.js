'use strict';
(function() {
angular.module('application')
    .controller('LoginCtrl', ['$scope','LoginService','$location',function($scope,LoginService,$location){
    $scope.user = {
        loginEmail:"brian.tobey123@gmail.com",
        loginPassword:"@ddinstagram",
        clientURI:"test",
        timeOffset:360,
        appId:"knotsillicon",
        IsValidationEnabled:true,
        Errors:{
            Errors:{

            },
            IsValidationEnabled:true
        }
    };

    $scope.loginNow =function(){
        LoginService.sendLoginRequest($scope.user).then(function(data){
            LoginService.saveAccessToken(data.userObj.accessToken);
            console.log(data);
            $location.path('/profile/'+data.userObj.accountId);
        });
    };

}]);
})();

