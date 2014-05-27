angular.module('Portfolio', ['firebaseResource']).
  factory('Portfolio', function ($rootScope, firebaseResource) {
    var Portfolio = firebaseResource(
      {
        path: 'portfolios'
      }
    );
    return Portfolio;
});

angular.module('User', ['firebaseResource']).
  factory('User', function ($rootScope, firebaseResource) {
    var User = firebaseResource(
      {
        path: 'users'
      }
    );
    return User;
});