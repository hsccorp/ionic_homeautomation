//Hemant: Custom directive to represent event View
angular.module('hscontroller')
.directive('eventView', function() {
      return {
        restrict: 'EA',
        scope: {
                    eventData: "=",
                    closeopen:"&",
                    footage:"&"
                },
             templateUrl: 'js/screens/events/templates/directive_event_view.html'
      };
    });
