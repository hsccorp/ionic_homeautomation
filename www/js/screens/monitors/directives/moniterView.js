//Hemant: Custom directive to represent monitor View

angular.module('hscontroller')
.directive('monitorView', function() {
      return {
        restrict: 'EA',
        scope: {
                    monitorData: "=",
                    liveview:"&"

                },
        templateUrl: 'js/screens/monitors/templates/directive_monitor_view.html'

      };
    });
