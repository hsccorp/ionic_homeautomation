angular.module('hscontroller')
.service('deviceListService',['$q','DeviceDTO', function($q,DeviceDTO) {

		var flag = true;


    var getDevices = function(floorid,roomid) {
		console.log("getDevices for floor id "+floorid +" and roomid "+roomid);
			var d = $q.defer();
			var query = firebase.database().ref("floors/"+floorid+"/rooms/"+roomid+"/devices/");
			 query.once("value")
			   .then(function(snapshot) {
				  var a = snapshot.exists();  // true

					 var c1 = snapshot.val(); // true

			   var devices =[];
					 for (var key in c1) {
                        var deviceDto=new DeviceDTO(c1[key].id,c1[key].name);
                        
                          devices.push(deviceDto);

					 }
				console.log("device callback");
				d.resolve(devices);

			 },function(error) {
                 // The Promise was rejected.
                 console.error("floor error"+error);
                 d.reject("Error");
               })

			return d.promise;
		}

        var addDevice = function(floorid,roomid,monitor) {

                    console.log("addDevice function called"+monitor.Name);
                    var d = $q.defer();

                     var newPostKey = firebase.database().ref().child('floors').push().key;

                      console.log("newPostKey"+newPostKey);



                      var postData = {

                         name: monitor.Name,
                         id: monitor.Id

                       };
                        console.log("add device floorid "+floorid);
					  console.log("add device roomid "+roomid);
					   console.log("add device room name "+monitor.Name);
                      // Write the new post's data simultaneously in the posts list and the user's post list.
                      var updates = {};
                      updates['/floors/'+floorid+'/rooms/'+roomid+"/devices/" + newPostKey] = postData;

                      firebase.database().ref().update(updates);





                    var query = firebase.database().ref("floors/"+floorid+"/rooms/"+roomid+"/devices/");
                    query.on('value', function(snapshot) {
                        console.log("value changed");
                        var c1 = snapshot.val(); // true

                            var devices =[];
                             for (var key in c1) {
                             var deviceDto=new DeviceDTO(c1[key].id,c1[key].name);
                                devices.push(deviceDto);

                             }
                             d.resolve(devices);

                      });

                    return d.promise;
                }



		return{
			getDevices : getDevices,
            addDevice : addDevice

		}
	}]);

