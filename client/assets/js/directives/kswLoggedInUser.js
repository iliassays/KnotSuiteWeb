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
                    element.css({
                        'background': 'url(' + scope.currentUserPhoto + ')',
                        'width': '60px',
                        'background-size': '100% 100%',
                        'background-repeat': 'no-repeat'
                    });
                }
            }
        });
})();