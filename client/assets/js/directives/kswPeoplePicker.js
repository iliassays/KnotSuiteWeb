"use strict";
(function(){
    angular.module('kswDirectiveModule')
        .directive("kswPeoplePicker",function(){
           return{
               restrict:"E",
               replace:true,
               templateUrl:"templates/directives/kswPeoplePicker.html",
               controller:function($scope, $element){
                   $scope.peoplePickerGroups = [
                       {key:"connType",value:"Group by connection type"},
                       {key:"entityType",value:"Group by type"},
                       {key:"nameType",value:"Group by name"}
                   ];

                   $scope.hidePeoplePicker = function(){
                       $scope.peoplePickerFlag = false;
                   }
               },
               link:function(scope, element, attrs){
               }
           }
        });
})();