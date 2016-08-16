

//Hemant: Factory for handling FloorDTO

angular.module('hscontroller')
.factory('DeviceDTO', ['$rootScope',  function
        ($rootScope) {


    var DeviceDTO = function(id,devicename) {
         this.deviceid = id;
         this.devicename = devicename;
         this.devicetype = 0;
    };




    return DeviceDTO;

}]);
