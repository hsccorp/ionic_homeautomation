angular.module('hscontroller')
.controller('roomListCtrl', [ "$scope","$state", "$ionicPlatform","$ionicPopup", "floorService","$ionicModal","$stateParams","homeService",
			function($scope,$state,$ionicPlatform,$ionicPopup, floorService,$ionicModal, $stateParams,homeService) {


			   $scope.floorid =$stateParams.floorId;
			   $scope.floorname=$stateParams.floorName;
			   console.log("floorname Data" + $scope.floorid);
				var vm = this;
				$scope.modal = null;
				$scope.rooms = [];
				$scope.modal = null;



				// uncomment if required
				// initialization needs to be done here: executes once only
				$scope.$on('$ionicView.loaded', function() {
					// Page Initializations - First time activities
					console.log("floorController has been loaded");
					homeService.getRoom($scope.floorid).then(function(data) {
                        // Success Handler
                        console.log("Received Data" + data);
                        $scope.rooms = data;
                    }, function(error) {
                        console.log("Error in receiving the Data" + error);
                    });

				});

				 $ionicPlatform.registerBackButtonAction(function (event) {
				 console.log("back button is working");
                       event.preventDefault();
                       $state.go('menu.home');

                    }, 1000);

				// uncomment if required
				// any view initialization needs to be done here: executes
				// everytime
				// page is active
				$scope.$on('$ionicView.beforeEnter', function() {
					// Anything needed each time page is shown
					console.log("Showing the home");

				});

				// uncomment if required
				$scope.$on('$ionicView.afterLeave', function() {
					// any cleanup needs to be done here: executes every time
					// when page is left

				});

				$scope.addRoom = function(){
				console.log("popup is loading");
					 $scope.showPopup();

				}

				$scope.showPopup = function() {
                                      $scope.data = {}

                                      // Custom popup
                                      var myPopup = $ionicPopup.show({
                                         template: '<input type = "text" ng-model = "data.roomname">',
                                         title: '<h4><b>Add Room</b></h4>',
                                         subTitle: '<h4>Enter the room name</h4>',
                                         scope: $scope,

                                         buttons: [
                                            { text: 'Cancel' }, {
                                               text: '<b>Save</b>',
                                               type: 'button-positive',
                                                  onTap: function(e) {

                                                     if (!$scope.data.roomname) {
                                                        //don't allow the user to close unless he enters model...
                                                           e.preventDefault();
                                                     } else {
                                                     	return $scope.addRoomFromService($scope.data.roomname);

                                                     }
                                                  }
                                            }
                                         ]
                                      });

                                      myPopup.then(function(res) {
                                         console.log('Tapped!', res);
                                      });
                                   };

            $scope.addRoomFromService = function(roomname){
            console.log("Roomname"+roomname);
            console.log("floorid"+$scope.floorid);

                                homeService.addRoom($scope.floorid,roomname).then(function(roomsdata) {
                                    // Success Handler
                                    $scope.rooms = roomsdata;
                                }, function(error) {
                                    console.log("Error in receiving the Data" + error);
                                });
                           	}

			} ]);

