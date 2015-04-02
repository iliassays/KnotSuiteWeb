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
                        var firstPartOfUrl = newValue.substr(0,newValue.lastIndexOf('/'));
                        var lastPartOfUrl = newValue.substr(newValue.lastIndexOf('/'));
                        if(lastPartOfUrl.indexOf(' ')){
                            newValue = firstPartOfUrl + lastPartOfUrl.replace(' ','%20');
                        }
                        element.css({
                            'background-image': "url("+newValue+")",
                            'width': '60px',
                            'background-size': '100% 100%',
                            'background-repeat': 'no-repeat'
                        });
                    });
                }
            }
        });
})();