"use strict";
(function(){
    angular.module("kswFilterModule")
        .filter("kswImageFilter",["ApiService",function(ApiService){
            return function(input,imageSize,personId){
                return ApiService.imageCdnServer +
                      '/getProfilePictureThumbnail/' +
                      personId +
                      '/' +
                      imageSize +
                      '/profile.jpg';
            }
        }]);
})();