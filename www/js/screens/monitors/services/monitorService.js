angular.module('hscontroller')
.service('monitorService', function($q) {

		var flag = true;
		var getData = function() {
			var d = $q.defer();
			if (flag)
				d.resolve("Moniter Page");
			else
				d.reject("Error");
			flag = !flag;
			return d.promise;
		}
		return{
			getData : getData
		}
	});

