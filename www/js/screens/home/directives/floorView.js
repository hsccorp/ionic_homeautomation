
//Hemant: Custom directive to represent floor View
angular.module('hscontroller')
.directive('floorView', function() {
      return {
        restrict: 'EA',
        scope: {
                    floorData: "="


                },
        templateUrl: 'js/screens/home/templates/directive_floor_view.html'

      };
    });
