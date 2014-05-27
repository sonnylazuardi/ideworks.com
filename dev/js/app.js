'use strict';

angular.module('fbrFirebase', []).
  value('firebase', (new Firebase('https://ideworks.firebaseio.com/')));

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers',
         'waitForAuth', 'routeSecurity', 'Portfolio', 'fbrFirebase', 'ngSanitize']
   )

   .run(['loginService', '$rootScope', 'FBURL', 'firebase', function(loginService, $rootScope, FBURL, firebase) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
      }
      // reset the database every time
       // firebase.remove();

       $rootScope.safeApply = function(fn) {
         var phase = this.$root.$$phase;
         if(phase == '$apply' || phase == '$digest') {
           if(fn && (typeof(fn) === 'function')) {
             fn();
           }
         } else {
           this.$apply(fn);
         }
       };
   }]);

