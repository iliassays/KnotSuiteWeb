"use strict";
(function(){
    angular.module("application")
        .service("MixPanelService",[function(){
            this.track = function(eventName){
                mixpanel.track(eventName);
            }
        }]);
})();