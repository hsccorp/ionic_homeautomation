

//Hemant: Factory for handling FloorDTO

angular.module('hscontroller')
.factory('RoomDTO', ['$rootScope',  function
        ($rootScope) {


    var RoomDTO = function(floorid,id,roomname) {
         this.floorid = floorid;
         this.roomid = id;
         this.roomname = roomname;
    };


    return RoomDTO;

}]);
