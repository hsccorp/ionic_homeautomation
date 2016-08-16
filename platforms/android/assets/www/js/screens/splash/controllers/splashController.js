angular.module('hscontroller')
.controller('splashController',
	        [  "$timeout", "$state", "$ionicHistory", function ( $timeout, $state, $ionicHistory) {

	        var vm = this;

	        var navigateHome = function() {
	        $timeout(function() {
	            $state.go('menu.notifications');
	          }, 1000);
	        }

	        navigateHome();
	        return vm;

    }]);
