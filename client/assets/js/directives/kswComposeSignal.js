"use strict";
(function () {
    angular.module('kswDirectiveModule')
        .directive("kswComposeSignal", ["$parse",
            function ($parse) {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: "templates/directives/kswComposeSignal.html",
                    controller: function ($scope, $element) {
                        $scope.showBottomPart = function () {
                            //$scope.isClickedInTextArea = true;
                            $element.css({"padding-bottom": "0"});
                            if (this.peoplePickerFlag) {
                                this.peoplePickerFlag = false;
                            }
                        }
                    },
                    link: function (scope, element, attrs) {

                    }
                };
            }]);
})();