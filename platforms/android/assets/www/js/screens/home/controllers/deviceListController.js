angular.module('hscontroller')
.controller('deviceListCtrl', [ "$scope","$state", "$rootScope","zm","floorService","$ionicModal","$stateParams","homeService","deviceListService","message","ZMDataModel","$ionicLoading","$ionicPopup","$ionicPlatform",
			function($scope,$state,$rootScope,zm, floorService,$ionicModal,$stateParams,homeService,deviceListService,message,ZMDataModel, $ionicLoading, $ionicPopup,$ionicPlatform ) {
               $scope.monitors = message;
			   $scope.roomid =$stateParams.roomId;
			    $scope.floorid =$stateParams.floorId;
			    $scope.roomname=$stateParams.roomName;
			   console.log( $scope.monitors+"device  Data roomid" + $scope.roomid);
			   console.log("device  Data floorid" + $scope.floorid);
				var vm = this;
				$scope.modal = null;
				$scope.devices = [];
				// uncomment if required
				// initialization needs to be done here: executes once only
				$scope.$on('$ionicView.loaded', function() {
					// Page Initializations - First time activities
					console.log("floorController has been loaded");
					deviceListService.getDevices($scope.floorid,$scope.roomid).then(function(data) {
                        // Success Handler
                        console.log("Received Data" + data);
                        $scope.devices = data;
                    }, function(error) {
                        console.log("Error in receiving the Data" + error);
                    });

				});

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



				 $scope.openModal = function (monitor) {
				        monitor.Monitor.Id, monitor.Monitor.Controllable, monitor.Monitor.ControlId, monitor.Monitor.connKey
				        var mid=monitor.Monitor.Id;
				        var controllable=monitor.Monitor.Controllable;
				        var controlid=monitor.Monitor.ControlId;
				        var connKey=monitor.Monitor.connKey;

                        ZMDataModel.zmLog("MonitorCtrl:Open Monitor Modal with monitor Id=" + mid +
                            " and Controllable:" + controllable + " with control ID:" + controlid +" connKey "+connKey);


                        $scope.monitor = monitor;
                        //console.log (">>>>>>>>>>>> MONITOR CRL " + $scope.monitor.
                        $scope.monitorId = mid;
                        $scope.monitorName = ZMDataModel.getMonitorName(mid);
                        $scope.LoginData = ZMDataModel.getLogin();
                        $scope.rand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
                         $scope.refMonitor = monitor;
                        ZMDataModel.zmLog("Monitor Orientation is: " + $scope.orientation);
                        $rootScope.rand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;



                        $scope.showPTZ = false;
                        $scope.monitorId = mid;
                        $scope.monitorName = ZMDataModel.getMonitorName(mid);
                        $scope.controlid = controlid;

                        $scope.LoginData = ZMDataModel.getLogin();
                        $rootScope.modalRand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
                        $scope.ptzMoveCommand = "";
                        $scope.ptzStopCommand = "";

                        $scope.zoomInCommand = "";
                        $scope.zoomOutCommand = "";
                        $scope.zoomStopCommand = "zoomStop";
                        $scope.canZoom = false;

                        $scope.presetOn = false;

                        $scope.connKey = (Math.floor((Math.random() * 999999) + 1)).toString();


                         ZMDataModel.zmLog("MonitorCtrl:Open Monitor Modal with monitor Id=" + mid +
                                    " and Controllable:" + controllable + " with control ID:" + controlid +" $scope.connKey "+$scope.connKey);
                       $scope.isControllable = controllable;


                        // This is a modal to show the monitor footage
                        // We need to switch to always awake if set so the feed doesn't get interrupted
                        ZMDataModel.setAwake(ZMDataModel.getKeepAwake());



                         $ionicModal.fromTemplateUrl('js/screens/monitors/templates/monitors-modal.html', {
                                scope: $scope,
                                animation: 'slide-in-up'
                            })
                            .then(function (modal) {
                                $scope.modal = modal;

                                $ionicLoading.show({
                                    template: "please wait...",
                                    noBackdrop: true,
                                    duration: zm.loadingTimeout
                                });
                                $scope.isModalActive = true;
                                $scope.modal.show();
                            });

                    };


                      
				$ionicPlatform.registerBackButtonAction(function (e) {
				console.log("back button called monitorController");
						e.preventDefault();
						if ($scope.modal.isShown())
						{
							// switch off awake, as liveview is finished
							ZMDataModel.zmDebug("Modal is open, closing it");
							ZMDataModel.setAwake(false);
							$scope.modal.remove();
						}
						else
						{
							$rootScope.$ionicGoBack();


						}

					}, 1000);

							
			

                     $scope.closeModal = function () {
                           // console.log("Close & Destroy Monitor Modal");

                            // stop networking -nph-zms keeps sucking data

                            // switch off awake, as liveview is finished
                            ZMDataModel.setAwake(false);
                            $scope.modal.remove();
                            $timeout (function() {ZMDataModel.zmLog("MonitorCtrl:Stopping network pull...");if (ZMDataModel.isForceNetworkStop())  ZMDataModel.stopNetwork("MonitorCtrl-closeModal");},300);


                        };


            $scope.liveview = function(device){
             console.log('liveView clicked'+device.devicename);
        				for(var i=0;i<$scope.monitors.length;i++)
        				{
        				    if($scope.monitors[i].Monitor.Id==device.deviceid)
        				    {
        				        $scope.openModal($scope.monitors[i]);
        				        break;
        				    }

        				}

        		}


				$scope.addDevice = function(){
					//alert("add room clicked::::");
					/*$scope.openModal($scope.monitors[0]);*/

                        $scope.showPopup();
				}

				  $scope.hidePopup = function(monitor) {
				  console.log('monitor added'+monitor.Monitor.Name);

				   deviceListService.addDevice($scope.floorid,$scope.roomid,monitor.Monitor)
				   .then(function(devicedata) {
                      // Success Handler
                      $scope.devices = devicedata;
                      }, function(error) {
                          console.log("Error in receiving the Data" + error);
                     });
				     $scope.monitorPopup.close();
				  }

                $scope.monitorPopup;
				// When button is clicked, the popup will be shown...
               $scope.showPopup = function() {
                  $scope.data = {}

                  // Custom popup
                  $scope.monitorPopup = $ionicPopup.show({
                     templateUrl: 'js/screens/home/templates/monitorlistpopup.html',

                     title: '<h4><b>Add Monitor</b></h4>',
                     subTitle: '<h4>Select Monitor To Add</h4>',
                     scope: $scope,

                     buttons: [
                        {
                           text: '<b>Cancel</b>',
                           type: 'button-positive'
                        }
                     ]
                  });

                  $scope.monitorPopup.then(function(res) {
                     console.log('Tapped!', res);
                  });
               };



			} ]);

