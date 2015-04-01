"use strict";
(function () {
    angular.module('kswDirectiveModule')
        .directive("kswLoggedInUser", function () {
            return {
                restrict: "A",
                scope: {
                    currentUserPhoto: '@'
                },
                link: function (scope, element, attrs) {
                    scope.$watch('currentUserPhoto', function(newValue, oldValue) {
                        element.css({
                            'background': 'url('+newValue+')',
                            'width': '60px',
                            'background-size': '100% 100%',
                            'background-repeat': 'no-repeat'
                        });
                    });
                }
            }
        });
})();