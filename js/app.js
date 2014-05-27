var App = angular.module('ideworks', ['ui.bootstrap', 'firebase']);

App.directive('imgLiquid', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	element.bind('load', function() {
            $(element).parent().imgLiquid();
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

var ModalCtrl = function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};