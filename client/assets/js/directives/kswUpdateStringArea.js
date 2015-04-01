"use strict";
(function () {
    angular.module('kswDirectiveModule')
        .directive("kswUpdateStringArea", function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    var updateAreaString = attrs.string.replace(/user/g,'span').replace(/attribute/g,'span').replace(/vote/g,'span');
                    element.html(updateAreaString);
                }
            }
        });
})();