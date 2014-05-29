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
		{item:'gopublic', link:'http://sonnylab.com/gopublic.web.id'},
		{item:'arbun', link:'http://archive.habibiefaried.com/arbun/index.php'},
		{item:'camel', link:'#camel'},
		{item:'broomlight', link:'http://sonnylab.com/anchor/blog/posts/broomlight'},
		{item:'kecap', link:'#kecap'},
		{item:'smoothie', link:'http://sonnylab.com/anchor/blog/posts/smoothie'},
	];
	
	$scope.awards = [
		{item:'thinkquest', link:'#thinkquest'},
		{item:'inaicta', link:'http://www.inaicta.web.id/inaicta/pemenang-inaicta-2013/'},
		{item:'compfest', link:'http://teknojurnal.com/malam-puncak-compfest-2013-lahirkan-banyak-jawara-pengembang-aplikasi/'},
		{item:'imaginecup', link:'http://blogs.msdn.com/b/indonesia/archive/2014/04/12/daftar-pemenang-imagine-cup-2014-indonesia.aspx'},
	];

	$scope.team = [
		{item:'kave', link:'#kave'},
		{item:'alif', link:'#alif'},
		{item:'evan', link:'#evan'},
		{item:'sonny', link:'#sonny'},
		{item:'habibie', link:'#habibie'},
		{item:'james', link:'#james'},
		{item:'genta', link:'#genta'},
		{item:'ch', link:'#ch'},
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