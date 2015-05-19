"use strict";
(function(){
    angular.module("application")
        .controller("knotSiliconPreviewCtrl",["$scope",function($scope){
            $scope.previewVideos = [
                {title:"demo 1",src:"/assets/videos/KnotSiliconPreview/1.webm"},
                {title:"demo 2",src:"/assets/videos/KnotSiliconPreview/2.webm"},
                {title:"demo 3",src:"/assets/videos/KnotSiliconPreview/3.webm"},
                {title:"demo 4",src:"/assets/videos/KnotSiliconPreview/4.webm"},
                {title:"demo 5",src:"/assets/videos/KnotSiliconPreview/5.webm"}
            ];
        }]);
})();