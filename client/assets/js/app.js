(function () {
    'use strict';

    angular.module('application', [
        'ui.router',
        'ngAnimate',
        'kswDirectiveModule',
        'kswFilterModule',
        'luegg.directives',
        //foundation
        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
        .config(config)
        .run(run)
    ;

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

    function config($urlProvider, $locationProvider, $httpProvider) {
        $urlProvider.otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    run.$inject = ['UserContextService', '$rootScope','EventService'];
    function run(UserContextService, $rootScope, EventService) {
        if(UserContextService.isLoggedIn()){
            $rootScope.isLoggedIn = UserContextService.isLoggedIn();
            UserContextService.saveCurrentUserData(UserContextService.getPersonalAccountInfo().currentUserData);
            setTimeout(function(){
                EventService.trigger('signedIn');
                EventService.trigger('updateProfilePicture', UserContextService.getPersonalAccountInfo().currentUserData);
            },400);
        }
        FastClick.attach(document.body);
    }

})();
