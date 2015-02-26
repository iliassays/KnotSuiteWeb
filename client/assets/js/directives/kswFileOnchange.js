"use strict";
(function(){
    angular.module('kswDirectiveModule')
        .directive("kswFileOnChange",function(){
            return {
                restrict: "A",
                scope : {
                    kswFileOnChange: '&'
                },
                link: function (scope, element) {
                    element.on('change', function () {
                        scope.kswFileOnChange();
                    });
                }
            };
        });
})();