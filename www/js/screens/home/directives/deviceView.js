
//Hemant: Custom directive to represent floor View

angular.module('hscontroller')
.directive('deviceView', function() {
      return {
        restrict: 'EA',
        scope: {
                    deviceData: "=",
                    liveVideo:"&"


                },
        templateUrl: 'js/screens/home/templates/directive_device_view.html'

      };
    });
