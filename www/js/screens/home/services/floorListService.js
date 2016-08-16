angular.module('hscontroller')
.service('homeService',['$q','FloorDTO','RoomDTO', function($q,FloorDTO,RoomDTO) {

		var flag = true;
		var getFloor = function() {
		console.log("getfloor function");
			var d = $q.defer();
			var query = firebase.database().ref("floors");
			 query.once("value")
			   .then(function(snapshot) {
				  var a = snapshot.exists();  // true

					 var c1 = snapshot.val(); // true

			   var floors =[];
					 for (var key in c1) {
                        var floorDto=new FloorDTO(key,c1[key].name);

					    floors.push(floorDto);

					 }
				console.log("floor callback");
				d.resolve(floors);

			 },function(error) {
                 // The Promise was rejected.
                 console.error("floor error"+error);
                 d.reject("Error");
               })

			return d.promise;
		}

		var addFloor = function(floorname) {

            console.log("addFloor function called"+floorname);
            var d = $q.defer();

             var newPostKey = firebase.database().ref().child('floors').push().key;

              console.log("newPostKey"+newPostKey);



              var postData = {

                 name: floorname

               };

              // Write the new post's data simultaneously in the posts list and the user's post list.
              var updates = {};
              updates['/floors/' + newPostKey] = postData;

              firebase.database().ref().update(updates);





            var query = firebase.database().ref("floors");
            query.on('value', function(snapshot) {
                console.log("value changed");
                var c1 = snapshot.val(); // true

                    var floors =[];
                     for (var key in c1) {
                     var floorDto=new FloorDTO(key,c1[key].name);


                        floors.push(floorDto);

                     }
                     d.resolve(floors);

              });

            return d.promise;
        }
		
		
		var removeFloor = function(floorkey) {

            console.log("removeFloor function called"+floorkey);
            var d = $q.defer();

			var removequery = firebase.database().ref("floors").child(floorkey).remove();



            var query = firebase.database().ref("floors");
            query.on('value', function(snapshot) {
                console.log("value changed");
                var c1 = snapshot.val(); // true

                    var floors =[];
                     for (var key in c1) {
                     var floorDto=new FloorDTO(key,c1[key].name);


                        floors.push(floorDto);

                     }
                     d.resolve(floors);

              });

            return d.promise;
        }

    var getRoom = function(floorid) {
		console.log("getRoom for floor id "+floorid);
			var d = $q.defer();
			var query = firebase.database().ref("floors/"+floorid+"/rooms/");
			 query.once("value")
			   .then(function(snapshot) {
				  var a = snapshot.exists();  // true

					 var c1 = snapshot.val(); // true

			   var rooms =[];
					 for (var key in c1) {
					 console.log("floorid "+floorid);
					  console.log("roomid "+key);
					   console.log("room name "+c1[key].name);
                        var roomDto=new RoomDTO(floorid,key,c1[key].name);
					    rooms.push(roomDto);

					 }
				console.log("room callback");
				d.resolve(rooms);

			 },function(error) {
                 // The Promise was rejected.
                 console.error("floor error"+error);
                 d.reject("Error");
               })

			return d.promise;
		}

        var addRoom = function(floorid,roomname) {

                    console.log("addRoom function called"+roomname);
                    var d = $q.defer();

                     var newPostKey = firebase.database().ref().child('floors').push().key;

                      console.log("newPostKey"+newPostKey);



                      var postData = {

                         name: roomname

                       };

                      // Write the new post's data simultaneously in the posts list and the user's post list.
                      var updates = {};
                      updates['/floors/'+floorid+'/rooms/' + newPostKey] = postData;

                      firebase.database().ref().update(updates);





                    var query = firebase.database().ref("floors/"+floorid+"/rooms/");
                    query.on('value', function(snapshot) {
                        console.log("value changed");
                        var c1 = snapshot.val(); // true

                            var floors =[];
                             for (var key in c1) {
                              console.log("floorid "+floorid);
                             					  console.log("roomid "+key);
                             					   console.log("room name "+c1[key].name);
                             var roomDto=new RoomDTO(floorid,key,c1[key].name);
                                floors.push(roomDto);

                             }
                             d.resolve(floors);

                      });

                    return d.promise;
                }



		return{
			getFloor : getFloor,
			addFloor : addFloor,
			getRoom : getRoom,
            addRoom : addRoom,
			removeFloor : removeFloor

		}
	}]);

