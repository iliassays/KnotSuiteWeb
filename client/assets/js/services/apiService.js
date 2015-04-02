"use strict";
(function() {
angular.module('application')
    .factory('ApiService',["$q","$http",function($q,$http){
    var baseUrl = "https://prod-frontserver.herokuapp.com";

    var post = function(url,data){
        var deferred = $q.defer();
        $http({
            url: baseUrl + url,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function(result) {
            deferred.resolve(result);
        }).error(function(result, status) {
            deferred.reject(status);
        });
        return deferred.promise;
    };

    return{
        post:post,
        apiUrl:baseUrl
    };
}]);
})();