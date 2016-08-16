

//Hemant: Factory for handling FloorDTO

angular.module('hscontroller')
.factory('FloorDTO', ['$rootScope',  function
        ($rootScope) {


    var FloorDTO = function(id,floorname) {
         this.floorid = id;
         this.floorname = floorname;
    };




    return FloorDTO;

}]);
