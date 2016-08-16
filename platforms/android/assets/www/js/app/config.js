angular.module('hscontroller')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,ZMDataModelProvider) {

var timeNow = new Date().getTime();
console.log("time now config" + timeNow);

       //Set the default Language
  			//	$translateProvider.preferredLanguage('en');

  				//set header text to center
  				$ionicConfigProvider.navBar.alignTitle('center');
  				$ionicConfigProvider.views.forwardCache(true);


  				// any unknown URLS go to 404
  				$urlRouterProvider.otherwise('/404');
  				// no route goes to index
  				$urlRouterProvider.when('', '/');
  				// use a state provider for routing



  				$stateProvider
  					.state('zm-portal-login', {
                data: {
                    requireLogin: false
                },
                url: "/zm-portal-login",
                templateUrl: "js/screens/settings/templates/zm-portal-login.html",
                controller: 'PortalLoginCtrl',

            })
            .state('splash', {
              cache: false,
              url: '/splash',
              templateUrl: 'js/screens/splash/templates/splash.html',
              controller: 'splashController',
              controllerAs: 'ctrl'
            })
  				.state('menu', {
  				    url: '/menu',
  				    abstract: true,
  				    templateUrl: 'js/screens/menu/templates/menu.html',
  				    controller: 'menuController'
  				  })
  				   .state('menu.home', {
  					  url: '/home',
  					  views: {
  					    'menuContent': {
  					  templateUrl: 'js/screens/home/templates/floorlist.html',
  					  controller: 'floorListCtrl'

  				    }
  				  }
  				}).state('menu.devices', {
  					  url: '/devices',
  					  views: {
  					    'menuContent': {
  					  templateUrl: 'js/screens/devices/templates/devices.html',
  					  controller: 'devicesController',
  					  controllerAs: 'devicesCtrl'
  				    }
  				  }
  				}).state('menu.monitors', {
                      data: {
                                requireLogin: true
                            },
                            resolve: {
                                message: function (ZMDataModel) {
                                   // console.log("Inside app.montage resolve");
                                    return ZMDataModel.getMonitors(0);
                                }
                            },
                        url: '/monitors',
                        views: {
                          'menuContent': {
                        templateUrl: 'js/screens/monitors/templates/monitors.html',
                        controller: 'monitorController',
                        controllerAs: 'monitorCtrl'
                      }
                    }
                  })

                  .state('menu.events', {
                   data: {
                              requireLogin: true
                          },
                          resolve: {
                              message: function (ZMDataModel) {
                                  //console.log("Inside app.events resolve");
                                  return ZMDataModel.getMonitors(0);
                              }
                          },
  					  url: '/events',
  					  views: {
  					    'menuContent': {
  					  templateUrl: 'js/screens/events/templates/events.html',
  					  controller: 'eventsController',
  					  controllerAs: 'eventsCtrl'
  				    }
  				  }
  				}).state('menu.settings', {
  					  url: '/settings',
  					  views: {
  					    'menuContent': {
  					  templateUrl: 'js/screens/settings/templates/settings.html',
  					  controller: 'settingsController',
  					  controllerAs: 'settingsCtrl'
  				    }
  				  }
  				}).state('menu.login', {
                        url: '/login',
                        views: {
                          'menuContent': {
                        templateUrl: 'js/screens/settings/templates/login.html',
                        controller: 'LoginCtrl'
                      }
                    }
                  })
             .state('menu.about', {
  					  url: '/about',
  					   views: {
                        'menuContent': {
                            templateUrl: 'js/screens/about/templates/about.html',
                            controller: 'aboutController',
                            controllerAs: 'aboutCtrl'
  					  }
  					  }


  				})
  				.state('menu.floor', {
                					url: '/floors/:floorId/:floorName',
                					views: {
                					    'menuContent': {
                					    templateUrl: 'js/screens/home/templates/roomlist.html',
                                        controller: 'roomListCtrl'
                					    }
                					}


                				})
                				.state('menu.room', {
                				                  data: {
                                                        requireLogin: true
                                                    },
                                                    resolve: {
                                                        message: function (ZMDataModel) {
                                                           // console.log("Inside app.montage resolve");
                                                            return ZMDataModel.getMonitors(0);
                                                        }
                                                    },
                                					url: '/rooms/:roomId/:floorId/:roomName',
                                					views:{
                                					'menuContent' :{
                                					templateUrl: 'js/screens/home/templates/devicelist.html',
                                                    controller: 'deviceListCtrl'
                                					}
                                					}


                                				});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/zm-portal-login');
});
