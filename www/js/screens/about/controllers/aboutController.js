angular.module('hscontroller')
.controller('aboutController', [ "$scope", "aboutService","$ionicPlatform",
			function($scope, aboutService,$ionicPlatform) {
				var vm = this;
				// uncomment if required
				// initialization needs to be done here: executes once only
				$scope.$on('$ionicView.loaded', function() {
					// Page Initializations - First time activities
					console.log("aboutController has been loaded");
					aboutService.getData().then(function(data) {
						// Success Handler
						console.log("Received Data" + data);
						vm.receivedData = data;
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
					console.log("Showing the aboutt");

				});

				// uncomment if required
				$scope.$on('$ionicView.afterLeave', function() {
					// any cleanup needs to be done here: executes every time
					// when page is left

				});


                $ionicPlatform.registerBackButtonAction(function (e) {
                                  e.preventDefault();
                                 console.log("handling back");

                              }, 999);









			} ]);

