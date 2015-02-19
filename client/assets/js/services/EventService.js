angular.module('application').service('EventService', ['$rootScope', function($rootScope) {
    this.trigger = function (name, args) {
        $rootScope.$broadcast(name, args);
    };

    this.on = function(name, handler) {
        $rootScope.$on(name, handler);
    };
}]);

//events.trigger('signedIn');

//events.on('signedIn', sync);

//function sync() {

//};