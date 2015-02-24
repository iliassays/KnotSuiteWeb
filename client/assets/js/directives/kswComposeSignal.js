"use strict";
(function () {
    angular.module('kswDirectiveModule')
        .directive("kswComposeSignal", ["$parse",
            function ($parse) {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: "templates/directives/kswComposeSignal.html",
                    link: function (scope, element, attrs) {
                        scope.showBottomPart = function(){
                            scope.isClickedInTextArea = true;
                            element.css({"padding-bottom":"0"});
                        }
                    }
                };
            }]);
})();