angular.module('hscontroller')
.controller('floorListCtrl', [ "$scope","$ionicActionSheet", "homeService","$ionicLoading","$state","$ionicPopup","ZMDataModel","$timeout",
			function($scope,$ionicActionSheet, homeService,$ionicLoading,$state,$ionicPopup,ZMDataModel,$timeout) {
				var vm = this;
				$scope.modal = null;
				$scope.show = function() {
                    $ionicLoading.show({
                      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                    });
                  };

                  $scope.hide = function(){
                        $ionicLoading.hide();
                  };
				// uncomment if required
				// initialization needs to be done here: executes once only
				$scope.$on('$ionicView.enter', function() {
					// Page Initializations - First time activities
					$scope.show($ionicLoading);
                    					console.log("homeController has been loaded");
                    					homeService.getFloor().then(function(data) {
                    						// Success Handler
                    						 $scope.hide($ionicLoading);
                    						console.log("Received Data" + data);
                    						$scope.floors = data;
                    					}, function(error) {
                    						console.log("Error in receiving the Data" + error);
                    					});


				});


				$scope.$on('$ionicView.beforeEnter', function() {
					// Anything needed each time page is shown
					console.log("Showing the home");
				

				});

				
				
				 $scope.showActionSheet = function(item) {

				   // Show the action sheet
				  $scope.hideSheet = $ionicActionSheet.show({
					 destructiveText: 'Delete',
					 cancelText: 'Cancel',
					 cancel: function() {
						  console.log("Click Working");

								$scope.selected=null;
								console.log("Selected value"+$scope.selected);
								return $scope.selected===item;
								hideSheet();
						},
						destructiveButtonClicked:function(){
						console.log("Delete button working");
						$scope.delete(item);
						},                                
					 buttonClicked: function(index) {
					   return true;
					 }
				   });

				   // For example's sake, hide the sheet after two seconds
				   $timeout(function() {
					 $scope.hideSheet();
				   }, 5000);
				   
				 };
				

			$scope.select= function(item) {
					$scope.selected = item;
					$scope.showActionSheet(item);
					
			 };

			 $scope.isActive = function(item) {
					return $scope.selected === item;
			 };
				
			$scope.delete=function(item)
			{
				$scope.hideSheet();
				$scope.fl=item.floorname;
				$scope.id=item.floorid;
				console.log("Floor ID"+$scope.id);
				console.log("Floor to be deleted"+$scope.fl);
				console.log("Delete Button is working");
				
				homeService.removeFloor(item.floorid).then(function(floordata) {
                        // Success Handler
                        $scope.floors = floordata;
                    }, function(error) {
                        console.log("Error in receiving the Data" + error);
                    });
					
					 
				
			}                


				//$scope.onRelease=function()
                //				{
                //				console.log(" release function is working");
                //				$scope.bool=false;
                //				console.log("boolean value"+$scope.bool)
                //				}

				// uncomment if required
				$scope.$on('$ionicView.afterLeave', function() {
					// any cleanup needs to be done here: executes every time
					// when page is left

				});


				$scope.floors = [];


				$scope.addFloor = function(){

				    $scope.showPopup();

               }

               $scope.addFloorFromService = function(floorname){

                    homeService.addFloor(floorname).then(function(floordata) {
                        // Success Handler
                        $scope.floors = floordata;
                    }, function(error) {
                        console.log("Error in receiving the Data" + error);
                    });
               	}
				$scope.addRoom = function(){
					alert("add room clicked::::");
				}





				// When button is clicked, the popup will be shown...
                   $scope.showPopup = function() {
                      $scope.data = {}

                      // Custom popup
                      var myPopup = $ionicPopup.show({
                         template: '<input type = "text" ng-model = "data.floorname">',
                         title: '<h4><b>Add Floor</b></h4>',
                         subTitle: '<h4>Enter the floor name</h4>',
                         scope: $scope,

                         buttons: [
                            { text: 'Cancel' }, {
                               text: '<b>Save</b>',
                               type: 'button-positive',
                                  onTap: function(e) {

                                     if (!$scope.data.floorname) {
                                        //don't allow the user to close unless he enters model...
                                           e.preventDefault();
                                     } else {
                                     	return $scope.addFloorFromService($scope.data.floorname);

                                     }
                                  }
                            }
                         ]
                      });

                      myPopup.then(function(res) {
                         console.log('Tapped!', res);
                      });
                   };





			} ]);

