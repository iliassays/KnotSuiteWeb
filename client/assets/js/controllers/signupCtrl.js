"use strict";
(function () {
    angular.module("application")
        .controller("signUpCtrl", ["$scope", "SignUpService","FoundationApi","$location",
            function ($scope, SignUpService,FoundationApi,$location) {
            $scope.registerNow = function (email) {
                FoundationApi.publish('loaderModal', 'open');
                SignUpService.register(email)
                    .then(function(response){
                        $scope.email = '';
                        FoundationApi.publish('loaderModal', 'close');
                        if(response.data.accountStatus == 1){
                            FoundationApi.publish('main-notifications', {
                                    title: 'SIGN UP',
                                    content: response.data.message+". Please check you mail address.",
                                    color: 'success',
                                    autoclose: "6000"
                                }
                            );
                            $location.path("/");
                        }else{
                            FoundationApi.publish('main-notifications', {
                                    title: 'ERROR',
                                    content: response.data.message,
                                    color: 'warning',
                                    autoclose: "3000"
                                }
                            );
                        }
                    });
            }
        }]);
})();