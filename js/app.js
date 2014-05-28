var App = angular.module('ideworks', ['ui.bootstrap', 'firebase', 'ngRoute']);

App.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		template: '&nbsp;',
		controller: '',
	})
	.when('/:pageId', {
		template: '&nbsp;',
		controller: '',
		resolve: {
			delay: function($q, $timeout, $route, $modal) {
				var pageId = $route.current.params.pageId;
				var modalInstance = $modal.open({
			      templateUrl: 'partials/'+pageId+'.html',
			      windowClass: 'portfolio-modal',
			      controller: ModalCtrl
			    });
				var delay = $q.defer();
		        return delay.promise;
			}
		}
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

App.directive('imgLiquid', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	element.bind('load', function() {
            	$(element).parent().imgLiquid({
            		onFinish: function() {
            			$(element).parent().hide().fadeIn('slow');
            		}
            	});
          	});
        }
    };
});

var MainCtrl = function ($scope, $modal, $log, $firebase) {
	$scope.works = [
		'camel',
		'camel',
		'camel',
		'camel',
	];
	
	$scope.awards = [
		'camel',
		'camel',
		'camel',
		'camel',
	];

	$scope.team = [
		'kave',
		'alif',
		'evan',
		'sonny',
		'habibie',
		'james',
		'genta',
		'ch',
	];

	$scope.open = function (path) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/'+path+'.html',
			windowClass: 'portfolio-modal',
			controller: ModalCtrl
		});
	};

	var ref = new Firebase("https://ideworks.firebaseio.com/contact");
	$scope.contact = $firebase(ref);

	$scope.send = function() {
		var name = angular.element('#contact_name').val();
		var email = angular.element('#contact_email').val();
		var message = angular.element('#contact_message').val();
		if (name == '' || email == '' || message == '') {
			alert('Please fill all field');
		} else {
			$scope.contact.$add({name: name, email: email, message: message});
			angular.element('#contact_form')[0].reset();
			angular.element('#contact_alert').fadeIn(1000);
		}
	}

};

var ModalCtrl = function ($scope, $modalInstance, $location) {
  $scope.ok = function () {
    $modalInstance.close();
    $location.path('/');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
    $location.path('/');
  };
};