"use strict";
(function () {

    angular.module('application').directive('profileImage', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            template: ' <div><img src="{{profileImage}}" ng-click="openFileBrowser()" class="profile-image">' +
            '<input type="file" style="display: none" accept="image/*">' +
            '</div>',
            link: function (scope, element, attrs) {
                scope.openFileBrowser = function () {
                    var imageFile = element[0].querySelector('input');
                    imageFile.click();
                };

                var imagePreview = function(imageFile){
                    var fileReader = new FileReader();
                    fileReader.onload = function(fileLoadedEvent) {
                        var srcData = fileLoadedEvent.target.result;
                        scope.profileImage = srcData;
                        scope.$apply();
                    }
                    fileReader.readAsDataURL(imageFile);
                };

                var model = $parse(attrs.profileImage);
                var modelSetter = model.assign;

                var updateFile = function () {
                    scope.$apply(function () {
                        var imageFile = element[0].querySelector('input').files[0];
                        if(imageFile){
                            modelSetter(scope,imageFile);
                            imagePreview(imageFile);
                        }
                    });
                };

                element.bind('change', updateFile);
            }
        };
    }]);

})();