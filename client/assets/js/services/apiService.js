"use strict";
(function () {
    angular.module('application')
        .factory('ApiService', ["$q", "$http", function ($q, $http) {
            var baseDevUrl = "https://dev-frontserver.herokuapp.com";
            var baseProdUrl = "https://prod-frontserver.herokuapp.com";
            var baseUrl = baseProdUrl;
            var chatServerUrl = "http://prod-chatserver.herokuapp.com";
            var imageCdnServer = "http://prod-cdn.herokuapp.com";

            var post = function (url, data, serverUrl) {
                var deferred = $q.defer();
                $http({
                    url: serverUrl == null ? baseUrl + url : serverUrl + url,
                    method: "POST",
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                }).error(function (result, status) {
                    deferred.reject(status);
                });
                return deferred.promise;
            };

            return {
                post: post,
                apiUrl: baseUrl,
                chatServerUrl:chatServerUrl,
                imageCdnServer:imageCdnServer
            };
        }]);
})();