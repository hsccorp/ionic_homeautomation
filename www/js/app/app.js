// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hscontroller', [
'ionic', 'controllers', 'angular-carousel'


                        ])


.run(function($ionicPlatform,$ionicSideMenuDelegate) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

     $ionicPlatform.registerBackButtonAction(function (event) {

                      console.log(" main app backbutton is working");
                           event.preventDefault();

                         if (!$ionicSideMenuDelegate.isOpenLeft())
                                        {
                                            $ionicSideMenuDelegate.toggleLeft();

                                        }
                                        else
                                        {
                                            navigator.app.exitApp();
                                        }

                              },1000);
  });




})

.constant('zm', {
           minAppVersion: '1.28.107', // if ZM is less than this, the app won't work
           recommendedAppVersion: '1.29',
           minEventServerVersion: '0.7',
           alarmFlashTimer: 20000, // time to flash alarm
           gcmSenderId: '710936220256',
           httpTimeout: 15000,
           largeHttpTimeout: 60000,
           logFile: 'zmNinjaLog.txt',
           authoremail: 'pliablepixels+zmNinja@gmail.com',
           logFileMaxSize: 20000, // after this limit log gets reset
           loginInterval: 300000, //5m*60s*1000 - ZM auto login after 5 mins
           //loginInterval: 30000,
           updateCheckInterval: 86400000, // 24 hrs
           loadingTimeout: 15000,
           safeMontageLimit: 100,
           safeImageQuality: 10,
           maxFPS: 30,
           defaultFPS: 3,
           maxMontageQuality: 70,
           defaultMontageQuality: 50,
           progressIntervalCheck: 5000, // used for progress indicator on event playback
           graphFillColor: 'rgba(151,187,205,0.5)',
           graphStrokeColor: 'rgba(151,187,205,0.8)',
           graphHighlightFill: 'rgba(0,163,124,0.5)',
           graphItemMax: 2000,
           graphDesktopItemMax: 2000,
           monitorCheckingColor: '#03A9F4',
           monitorNotRunningColor: '#F44336',
           monitorPendingColor: '#FF9800',
           monitorRunningColor: '#4CAF50',
           monitorErrorColor: '#795548',
           montageScaleFrequency: 300,
           eventsListDetailsHeight: 200.0,
           eventsListScrubHeight: 300,
           loginScreenString: "var currentView = 'login'", // Isn't there a better way?
           desktopUrl: "/zm",
           desktopApiUrl: "/api/zm",
           latestRelease: "https://api.github.com/repos/pliablepixels/zmNinja/releases/latest",
           blogUrl:"http://pliablepixels.github.io/feed.json",
           nphSwitchTimer:3000,
           eventHistoryTimer:10000,
           eventPlaybackQuery:3000,



       })
	   // this can be used to route img-src through interceptors. Works well, but when
// nph-zms streams images it doesn't work as success is never received
// (keeps reading data). Hence not using it now
//credit: http://stackoverflow.com/questions/34958575/intercepting-img-src-via-http-interceptor-as-well-as-not-lose-the-ability-to-kee
.directive('httpSrc', [
        '$http', 'imageLoadingDataShare', 'ZMDataModel',
        function ($http, imageLoadingDataShare, ZMDataModel) {
        var directive = {
            link: postLink,
            restrict: 'A'
        };
        return directive;

        function postLink(scope, element, attrs) {
            //console.log ("HELLO NEW");
            var requestConfig = {
                method: 'GET',
                //url: attrs.httpSrc,
                responseType: 'arraybuffer',
                cache: 'true'
            };

            function base64Img(data) {
                var arr = new Uint8Array(data);
                var raw = '';
                var i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                return btoa(raw);
            }
            attrs.$observe('httpSrc', function (newValue) {
                requestConfig.url = newValue;
                //console.log ("requestConfig is " + JSON.stringify(requestConfig));
                imageLoadingDataShare.set(1);
                $http(requestConfig)
                    .success(function (data) {
                        //console.log ("Inside HTTP after Calling " + requestConfig.url);
                        //console.log ("data got " + JSON.stringify(data));


                        var b64 = base64Img(data);
                        attrs.$set('src', "data:image/jpeg;base64," + b64);
                        imageLoadingDataShare.set(0);
                    });
            });

        }
    }
])


//------------------------------------------------------------------
// switch between collection repeat or ng-repeat
//-------------------------------------------------------------------
.directive('repeatsmart', function ($compile, $rootScope) {
    return {
        restrict: 'A',
        priority: 2000,
        terminal: true,
        link: function (scope, element) {
            var repeatDirective = ($rootScope.platformOS == 'desktop') ? 'ng-repeat' : 'collection-repeat';
            console.log ("*********** REPEAT SCROLL IS " + repeatDirective);

            element.attr(repeatDirective, element.attr('repeatsmart'));
            element.removeAttr('repeatsmart');
            $compile(element)(scope);
        }
    };
})


.directive('detectGestures', function($ionicGesture) {
  return {
    restrict :  'A',

    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;

      switch(gestureType) {
        case 'pinchin':
          $ionicGesture.on('pinchin', scope.reportEvent, elem);
          break;
      }

    }
  };
})

.directive('tooltip', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (attrs.title) {
                var $element = $(element);
                $element.attr("title", attrs.title);
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "right",
                    positionTracker: true,
                    maxWidth: 500,
                    contentAsHTML: true
                });
            }
        }
    };
})




//------------------------------------------------------------------
// I use this factory to share data between carousel and lazy load
// carousel will not progress autoslide till imageLoading is 0 or -1
//-------------------------------------------------------------------
.factory('imageLoadingDataShare', function () {
    var imageLoading = 0; // 0 = not loading, 1 = loading, -1 = error;
    return {
        'set': function (val) {
            imageLoading = val;
            //console.log ("** IMAGE  LOADING **"+val);
        },
        'get': function () {

            return imageLoading;
        }
    };
})

//-------------------------------------------------------
// Ability to share controllers with modals
// Credit: http://codepen.io/julianpaulozzi/pen/wBgpjM
//-------------------------------------------------------

.factory('appModalService',
['$ionicModal', '$rootScope', '$q', '$injector', '$controller', function($ionicModal, $rootScope, $q, $injector, $controller) {

  return {
    show: show
  };

  function show(templateUrl, controller, parameters, options) {
    // Grab the injector and create a new scope
    var deferred = $q.defer(),
        ctrlInstance,
        modalScope = $rootScope.$new(),
        thisScopeId = modalScope.$id,
        defaultOptions = {
          animation: 'slide-in-up',
          focusFirstInput: false,
          backdropClickToClose: true,
          hardwareBackButtonClose: true,
          modalCallback: null
        };

    options = angular.extend({}, defaultOptions, options);

    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: modalScope,
      animation: options.animation,
      focusFirstInput: options.focusFirstInput,
      backdropClickToClose: options.backdropClickToClose,
      hardwareBackButtonClose: options.hardwareBackButtonClose
    }).then(function (modal) {
      modalScope.modal = modal;

      modalScope.openModal = function () {
        modalScope.modal.show();
      };
      modalScope.closeModal = function (result) {
        deferred.resolve(result);
        modalScope.modal.hide();
      };
      modalScope.$on('modal.hidden', function (thisModal) {
        if (thisModal.currentScope) {
          var modalScopeId = thisModal.currentScope.$id;
          if (thisScopeId === modalScopeId) {
            deferred.resolve(null);
            _cleanup(thisModal.currentScope);
          }
        }
      });

      // Invoke the controller
      var locals = { '$scope': modalScope, 'parameters': parameters };
      var ctrlEval = _evalController(controller);
      ctrlInstance = $controller(controller, locals);
      if (ctrlEval.isControllerAs) {
        ctrlInstance.openModal = modalScope.openModal;
        ctrlInstance.closeModal = modalScope.closeModal;
      }

      modalScope.modal.show()
        .then(function () {
        modalScope.$broadcast('modal.afterShow', modalScope.modal);
      });

      if (angular.isFunction(options.modalCallback)) {
        options.modalCallback(modal);
      }

    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function _cleanup(scope) {
    scope.$destroy();
    if (scope.modal) {
      scope.modal.remove();
    }
  }

  function _evalController(ctrlName) {
    var result = {
      isControllerAs: false,
      controllerName: '',
      propName: ''
    };
    var fragments = (ctrlName || '').trim().split(/\s+/);
    result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
    if (result.isControllerAs) {
      result.controllerName = fragments[0];
      result.propName = fragments[2];
    } else {
      result.controllerName = ctrlName;
    }

    return result;
  }

}])

//credit: https://github.com/driftyco/ionic/issues/3131
.factory('SecuredPopups', [
    '$ionicPopup',
    '$q',
    function ($ionicPopup, $q) {

        var firstDeferred = $q.defer();
        firstDeferred.resolve();

        var lastPopupPromise = firstDeferred.promise;

        // Change this var to true if you want that popups will automaticly close before opening another
        var closeAndOpen = false;

        return {
            'show': function (method, object) {
                var deferred = $q.defer();
                var closeMethod = null;
                deferred.promise.isOpen = false;
                deferred.promise.close = function () {
                    if (deferred.promise.isOpen && angular.isFunction(closeMethod)) {
                        closeMethod();
                    }
                };

                if (closeAndOpen && lastPopupPromise.isOpen) {
                    lastPopupPromise.close();
                }

                lastPopupPromise.then(function () {
                    deferred.promise.isOpen = true;
                    var popupInstance = $ionicPopup[method](object);

                    closeMethod = popupInstance.close;
                    popupInstance.then(function (res) {
                        deferred.promise.isOpen = false;
                        deferred.resolve(res);
                    });
                });

                lastPopupPromise = deferred.promise;

                return deferred.promise;
            }
        };
    }
])


//------------------------------------------------------------------
// this directive will be called any time an image completes loading
// via img tags where this directive is added (I am using this in
// events and monitor view to show a loader while the image is
// downloading from ZM
//------------------------------------------------------------------

.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                //call the function that was passed
                scope.$apply(attrs.imageonload);
            });
        }


    };
})



//--------------------------------------------------------------------------------------------
// This directive is adapted from https://github.com/paveisistemas/ionic-image-lazy-load
// I've removed lazyLoad and only made it show a spinner when an image is loading
//--------------------------------------------------------------------------------------------
.directive('imageSpinnerSrc', ['$document', '$compile', 'imageLoadingDataShare', '$timeout',
    function ($document, $compile, imageLoadingDataShare, $timeout) {
        return {
            restrict: 'A',
            scope: {
                imageSpinnerBackgroundImage: "@imageSpinnerBackgroundImage"
            },
            link: function ($scope, $element, $attributes) {

                if ($attributes.imageSpinnerLoader) {
                    var loader = $compile('<div class="image-loader-container"><ion-spinner style="position:fixed;top:5%;right:5%" class="image-loader" icon="' + $attributes.imageSpinnerLoader + '"></ion-spinner></div>')($scope);
                    $element.after(loader);
                }
                imageLoadingDataShare.set(1);
                loadImage();

                $attributes.$observe('imageSpinnerSrc', function (value) {
                    //console.log ("DIRECTIVE SOURCE CHANGED");
                    imageLoadingDataShare.set(1);
                    loadImage();
                    //deregistration();

                });


                // show an image-missing image
                $element.bind('error', function () {
                    // console.log ("DIRECTIVE: IMAGE ERROR");
                    loader.remove();


                    var url = 'img/novideo.png';
                    $element.prop('src', url);
                    imageLoadingDataShare.set(0);
                });

                function waitForFrame1() {
                    ionic.DomUtil.requestAnimationFrame(
                        function () {
                            imageLoadingDataShare.set(0);
                            //console.log ("IMAGE LOADED");
                        });

                }

                function loadImage() {
                    $element.bind("load", function (e) {
                        if ($attributes.imageSpinnerLoader) {
                            //console.log ("DIRECTIVE: IMAGE LOADED");
                            loader.remove();
                            //imageLoadingDataShare.set(0);
                            //console.log ("rendered");

                            // lets wait for 2 frames for animation
                            // to render - hoping this will improve tear
                            // of images
                            ionic.DomUtil.requestAnimationFrame(
                                function () {
                                    waitForFrame1();
                                });

                        }
                    });




                    if ($scope.imageSpinnerBackgroundImage == "true") {
                        var bgImg = new Image();
                        bgImg.onload = function () {
                            if ($attributes.imageSpinnerLoader) {
                                loader.remove();
                            }
                            // set style attribute on element (it will load image)
                            if (imageLoadingDataShare.get() != 1)

                                $element[0].style.backgroundImage = 'url(' + $attributes.imageSpinnerSrc + ')';

                            //$element[0].style.backgroundImage = 'url(' + 'img/novideo.png'+ ')';

                        };


                        bgImg.src = $attributes.imageSpinnerSrc;

                    } else {
                        $element[0].src = $attributes.imageSpinnerSrc; // set src attribute on element (it will load image)

                    }
                }

                function isInView() {
                    return true;
                }

                $element.on('$destroy', function () {

                });


            }
        };
    }])



//------------------------------------------------------------------
// In Android, HTTP requests seem to get stuck once in a while
// It may be a crosswalk issue.
// To tackle this gracefully, I've set up a global interceptor
// If the HTTP request does not complete in 15 seconds, it cancels
// That way the user can try again, and won't get stuck
// Also remember you need to add it to .config
//------------------------------------------------------------------
.factory('timeoutHttpIntercept', ['$rootScope', '$q', 'zm', '$injector', function ($rootScope, $q, zm, $injector) {
    $rootScope.zmCookie = "";

    return {



        'request': function (config) {


            // handle basic auth properly
            if (config.url.indexOf("@") > -1)
            {
               //console.log ("HTTP basic auth INTERCEPTOR URL IS "  + config.url);
                var components = URI.parse(config.url);
               // console.log ("Parsed data is " + JSON.stringify(components));
                var credentials = btoa(components.userinfo);
                //var authorization = {'Authorization': 'Basic ' + credentials};
               //config.headers.Authorization = 'Basic ' + credentials;

               // console.log ("Full headers: " + JSON.stringify(config.headers));

            }


            if ($rootScope.zmCookie) {
                config.headers.Cookie = "ZMSESSID=" + $rootScope.zmCookie;
            }

            else
            {
              //  console.log ("No cookie present in " + config.url);
            }

            if ((config.url.indexOf("/api/states/change/") > -1) ||
                (config.url.indexOf("getDiskPercent.json") > -1) ||
                (config.url.indexOf("daemonCheck.json") > -1) ||
                (config.url.indexOf("getLoad.json") > -1))


            {
                // these can take time, so lets bump up timeout
                config.timeout = zm.largeHttpTimeout;

            } else {
                config.timeout = zm.httpTimeout;
            }
            return config;
        },

        'response': function (response) {
            var cookies = response.headers("Set-Cookie");
            if (cookies != null) {

                var zmSess = cookies.match("ZMSESSID=(.*?);");

                if (zmSess) {
                    if (zmSess[1]) {

                       // console.log ("***** SETTING COOKIE TO "  + zmCookie);
                        $rootScope.zmCookie = zmSess[1];
                    }
                }
            }

            //console.log ("HTTP response");
            return response;
        }


    };
}])


//-----------------------------------------------------------------
// This service automatically checks for new versions every 24 hrs
//------------------------------------------------------------------
.factory('zmCheckUpdates', function ($interval, $http, zm, $timeout, $localstorage, ZMDataModel, $rootScope) {
    var zmUpdateHandle;
    var zmUpdateVersion = "";

    function start() {
        checkUpdate();
        $interval.cancel(zmUpdateHandle);
        zmUpdateHandle = $interval(function () {
            checkUpdate();

        }, zm.updateCheckInterval);


        function checkUpdate() {
            var lastdateString = $localstorage.get("lastUpdateCheck");
            var lastdate;
            if (!lastdateString) {

                lastdate = moment().subtract(2, 'day');

            } else {
                lastdate = moment(lastdateString);
            }
            var timdiff = moment().diff(lastdate, 'hours');
            if (timdiff < 24) {
                ZMDataModel.zmLog("Checked for update " + timdiff + " hours ago. Not checking again");

                return;
            }
            ZMDataModel.zmLog("Checking for new version updates...");


            $http.get(zm.latestRelease)
                .then(function (success) {


                    $localstorage.set("lastUpdateCheck", moment().toISOString());
                    //console.log ("FULL STRING " + success.data.tag_name);
                    var res = success.data.tag_name.match("v(.*)");
                    zmUpdateVersion = res[1];
                    var currentVersion = ZMDataModel.getAppVersion();
                    if ($rootScope.platformOS == "desktop") {
                        zmUpdateVersion = zmUpdateVersion + "D";
                    }
                    if (ZMDataModel.getAppVersion() != zmUpdateVersion) {
                        $rootScope.newVersionAvailable = "v" + zmUpdateVersion + " available";
                    } else {
                        $rootScope.newVersionAvailable = "";
                    }
                    //console.log ("UPDATE " + zmVersion);
                });

            ZMDataModel.zmLog ("Checking for news updates");
            $http.get(zm.blogUrl)
            .success (function (data) {
                $rootScope.newBlogPost = "";
                if (data.length <=0)
                {
                    $rootScope.newBlogPost="";
                    return;
                }

                var lastDate = $localstorage.get("latestBlogPostChecked");
                if (!lastDate)
                {

                    $rootScope.newBlogPost="(new post)";
                    return;
                }

                 var mLastDate = moment(lastDate);
                 var mItemDate = moment(data[0].date);

                if (mItemDate.diff(mLastDate) >0)
                {
                    ZMDataModel.zmDebug("New post dated " + data[0].date + " found");
                    if (data[0].level == "critical" )
                    {
                        $rootScope.newBlogPost = "(new post)";
                    }
                    else
                    {
                        ZMDataModel.zmDebug ("Not showing a notification in menu as this is not critical");
                    }
                }
                else
                {
                    ZMDataModel.zmDebug("Latest post dated " + data[0].date + " but you read " + lastDate);
                }


            });

        }
    }

    function getLatestUpdateVersion() {
        return (zmUpdateVersion == "") ? "(unknown)" : zmUpdateVersion;
    }

    return {
        start: start,
        getLatestUpdateVersion: getLatestUpdateVersion
            //stop: stop,

    };


})



//-----------------------------------------------------------------
// This service automatically logs into ZM at periodic intervals
//------------------------------------------------------------------

.factory('zmAutoLogin', function ($interval, ZMDataModel, $http, zm, $browser, $timeout, $q, $rootScope, $ionicLoading, $ionicPopup, $state, $ionicContentBanner, EventServer, $ionicHistory) {
    var zmAutoLoginHandle;

    //------------------------------------------------------------------
    // doLogin() emits this when there is an auth error in the portal
    //------------------------------------------------------------------

    $rootScope.$on("auth-error", function () {

        ZMDataModel.zmDebug("zmAutoLogin: Inside auth-error emit");
        ZMDataModel.displayBanner('error', ['ZoneMinder authentication failed', 'Please check settings']);

    });

    //------------------------------------------------------------------
    // doLogin() emits this when our auth credentials work
    //------------------------------------------------------------------


    $rootScope.$on("auth-success", function () {
        var contentBannerInstance = $ionicContentBanner.show({
            text: ['ZoneMinder authentication success'],
            interval: 2000,
            type: 'info',
            transition: 'vertical'
        });

        $timeout(function () {
            contentBannerInstance();
        }, 2000);
        ZMDataModel.zmDebug("auth-success emit:Successful");
    });


    $rootScope.getProfileName = function()
    {
        var ld = ZMDataModel.getLogin();
        return (ld.serverName || '(none)');
    };

    //------------------------------------------------------------------
    // doLogin() is the function that tries to login to ZM
    // it also makes sure we are not back to the same page
    // which actually means auth failed, but ZM treats it as a success
    //------------------------------------------------------------------

    function doLogin(str) {



        var d = $q.defer();

          var statename = $ionicHistory.currentStateName();

            if (statename == "montage-history")
            {
                ZMDataModel.zmLog ("Skipping login process as we are in montage history. Re-logging will mess up the stream");
                d.resolve("success");
                return d.promise;

            }

        ZMDataModel.zmDebug ("Resetting zmCookie...");
        $rootScope.zmCookie='';
        // first try to login, if it works, good
        // else try to do reachability
        proceedWithLogin()
        .then (function (success)
               {
                    d.resolve (success);
                    return d.promise;
               },
               function (error)
               // login to main failed, so try others
               {
                    ZMDataModel.getReachableConfig(true)
                    .then (function (data)
                    {
                        proceedWithLogin()
                        .then (function(success)
                           { d.resolve(success); return d.promise;},
                           function(error)
                           {  d.reject(error); return d.promise;});

                    },
                    function (error)
                    {
                        d.reject(error); return d.promise;
                    });

                });

        /*ZMDataModel.getReachableConfig()
        .then (function (data)
               {
                    ZMDataModel.zmLog ("REACHABILITY SUCCESS " + JSON.stringify(data));
                    proceedWithLogin()
                    .then (function(success)
                           { d.resolve(success); return d.promise;},
                           function(error)
                           {  d.reject(error); return d.promise;});

               },
               function (error)
               {
                    ZMDataModel.zmLog ("REACHABILITY ERROR " + JSON.stringify(error));
                    ZMDataModel.zmLog ("Still trying to proceed with " + ZMDataModel.getLogin().serverName);

                    proceedWithLogin()
                    .then (function(success)
                           { d.resolve(success); return d.promise;},
                           function(error)
                           {  d.reject(error); return d.promise;});


               });*/
        return d.promise;


        function proceedWithLogin()
        {
                // recompute rand anyway so even if you don't have auth
            // your stream should not get frozen
            $rootScope.rand = Math.floor((Math.random() * 100000) + 1);
            $rootScope.modalRand = Math.floor((Math.random() * 100000) + 1);



           // console.log ("***** STATENAME IS " + statename);

            var d = $q.defer();
            var ld = ZMDataModel.getLogin();
            ZMDataModel.zmLog("zmAutologin called");

            if (str) {
                $ionicLoading.show({
                    template: str,
                    noBackdrop: true,
                    duration: zm.httpTimeout
                });
            }

            ZMDataModel.isReCaptcha()
                .then(function (result) {
                    if (result == true) {
                        $ionicLoading.hide();
                        ZMDataModel.displayBanner('error', ['reCaptcha must be disabled',
                                            ], "", 8000);
                        var alertPopup = $ionicPopup.alert({
                            title: 'reCaptcha enabled',
                            template: 'Looks like you have enabled reCaptcha. It needs to be turned off for zmNinja to work'
                        });



                        // close it after 5 seconds
                        $timeout(function () {

                            alertPopup.close();
                        }, 5000);

                        d.reject ("Error-disable recaptcha");
                    return (d.promise);
                    }



                });



            var loginData = ZMDataModel.getLogin();
            //ZMDataModel.zmDebug ("*** AUTH LOGIN URL IS " + loginData.url);
            $http({
                    method: 'POST',
                    //withCredentials: true,
                    url: loginData.url + '/index.php',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                    },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" +
                                encodeURIComponent(obj[p]));
                        var params = str.join("&");
                        return params;
                    },

                    data: {
                        username: loginData.username,
                        password: loginData.password,
                        action: "login",
                        view: "console"
                    }
                })
                .success(function (data, status, headers) {
                    $ionicLoading.hide();

                    // Coming here does not mean success
                    // it could also be a bad login, but
                    // ZM returns you to login.php and returns 200 OK
                    // so we will check if the data has
                    // <title>ZM - Login</title> -- it it does then its the login page


                    if (data.indexOf(zm.loginScreenString) == -1) {
                        //eventServer.start();
                        $rootScope.loggedIntoZm = 1;

                        ZMDataModel.zmLog("zmAutologin successfully logged into Zoneminder");

                        d.resolve("Login Success");

                        $rootScope.$emit('auth-success', data);

                    } else //  this means login error
                    {
                        $rootScope.loggedIntoZm = -1;
                        //console.log("**** ZM Login FAILED");
                        ZMDataModel.zmLog("zmAutologin Error: Bad Credentials ", "error");
                        $rootScope.$emit('auth-error', "incorrect credentials");

                        d.reject("Login Error");
                        return (d.promise);
                    }

                    // Now go ahead and re-get auth key
                    // if login was a success
                    $rootScope.authSession = "undefined";
                    var ld = ZMDataModel.getLogin();
                    ZMDataModel.getAuthKey($rootScope.validMonitorId)
                        .then(function (success) {

                                //console.log(success);
                                $rootScope.authSession = success;
                                ZMDataModel.zmLog("Stream authentication construction: " +
                                    $rootScope.authSession);

                            },
                            function (error) {
                                //console.log(error);

                                ZMDataModel.zmLog("Modal: Error returned Stream authentication construction. Retaining old value of: " + $rootScope.authSession);
                                ZMDataModel.zmDebug("Error was: " + JSON.stringify(error));
                            });

                    return (d.promise);

                })
                .error(function (error, status) {
                    $ionicLoading.hide();

                    //console.log("**** ZM Login FAILED");

                    // FIXME: Is this sometimes results in null

                    ZMDataModel.zmLog("zmAutologin Error " + JSON.stringify(error) +  " and status " + status);
                    // bad urls etc come here
                    $rootScope.loggedIntoZm = -1;
                    $rootScope.$emit('auth-error', error);

                    d.reject("Login Error");
                    return d.promise;
                });
            return d.promise;
        }


    }

    function start() {
        var ld = ZMDataModel.getLogin();
        // lets keep this timer irrespective of auth or no auth
            $rootScope.loggedIntoZm = 0;
            $interval.cancel(zmAutoLoginHandle);
            //doLogin();
            zmAutoLoginHandle = $interval(function () {
                doLogin("");

            }, zm.loginInterval); // Auto login every 5 minutes
            // PHP timeout is around 10 minutes
            // should be ok?

    }

    function stop() {
        var ld = ZMDataModel.getLogin();

            $interval.cancel(zmAutoLoginHandle);
            $rootScope.loggedIntoZm = 0;
            ZMDataModel.zmLog("Cancelling zmAutologin timer");

    }

    return {
        start: start,
        stop: stop,
        doLogin: doLogin
    };
});

