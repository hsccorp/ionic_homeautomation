
//Hemant: Custom directive to represent floor View

angular.module('hscontroller')
.directive('roomView', function() {
      return {
        restrict: 'EA',
        scope: {
                    rooms: "="


                },
        templateUrl: 'js/screens/home/templates/directive_room_view.html'

      };
    });
