angular.module('hscontroller')
.service('aboutService', function($q) {

		var flag = true;
		var getData = function() {
			var d = $q.defer();
			if (flag)
				d.resolve("About Page");
			else
				d.reject("Error");
			flag = !flag;
			return d.promise;
		}
		return{
			getData : getData
		}
	});

