/* chapter5/controllers.js */
'use strict';
/* Controllers */
var bilgezControllers = angular.module('bilgezControllers', []);
//bilgezControllers.constant("Modernizr", Modernizr);
//            ucus.ara(ucusgirdi, function (ucuslist, getResponseHeaders) {
//$window.alert(ucuslist[0])
//router ile ucuslar.html e yonlendir ve listeyi orada bir template ile listele
//$window.location.href = "/#!/ucuslar";
//            });
bilgezControllers.controller('ucusCtrl', ['$scope','$window','$location',"$http",'ucus',
    function ucusCtrl($scope, $window, $location, $http, ucus) {

        //ucusGirdi View Model yaratilir
        //$scope.ucusgirdi.nereden = "İstanbul";
        $scope.ucusgirdi = {};

        $scope.ucusara = function (ucusgirdi) {
           // $window.alert(JSON.stringify(ucusgirdi.nereden))
            $window.location.href = "/#!/ucuslar/" + ucusgirdi.nereden.code + "/" + ucusgirdi.nereye.code + "/" + ucusgirdi.checkin + "/" + ucusgirdi.checkout + "/" + ucusgirdi.yetismus+"/"+ucusgirdi.cocukmus;
        }
        $scope.popup = {};
        $scope.popup = {
            acik: false 
        }
        $scope.datesecac = function () {
            $scope.popup.acik = true;
        }
        $scope.popup2 = {};
        $scope.popup2 = {
            acik: false
        }
        $scope.datesecac2 = function () {
            $scope.popup2.acik = true;
        }
        $scope.getLocation = function (val) {
            if (val.length < 3)
                return;
            return $http.get('/API/havalimani/'+val,  {
            }).then(function (response) {
                return response.data;
            });
        };
    }]);
bilgezControllers.controller('ucuslarCtrl', ['$scope', '$window', '$routeParams','ucus',
    function ($scope, $window, $routeParams, ucus) {
        var ucusgirdi = {
            nereden: $routeParams.nereden,
            nereye: $routeParams.nereye,
            checkin: $routeParams.checkin,
            checkout: $routeParams.checkout,
            yetiskin: $routeParams.yet,
            cocuk: $routeParams.cocuk
        };
        $scope.ucuslist = {};
            ucus.ara(ucusgirdi, function (ucuslist, getResponseHeaders) {
                $scope.ucuslist = ucuslist;
        });
            $scope.sec = function (ucusid) {
                $window.alert(ucusid);

                $window.location.href = "/#!/ucuslar/" + ucusid;

            }
    }
    ]);
bilgezControllers.controller('ucusbilgiCtrl', ['$scope', '$window', '$routeParams',
    function ($scope, $window, $routeParams) {
        var ucusid = $routeParams.ucusid;
        $window.alert(ucusid);

    }
]);
bilgezControllers.controller('havalimaniCtrl', ['$scope', 'FileUploader',
        function havalimaniCtrl($scope, FileUploader) {

        //json dosyasını parse etmeli ve teker teker eklemeli - hepsini gönderince problem oluyor


        $scope.shown = false;
        var uploader = $scope.uploader = new FileUploader({
            url: '/API/havalimani'
        });
        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.log('item yuklenmeden once soyleyeceklerim var:' + item.toString());
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.log("response burada:" + response.msg);
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);


/*
 * Login Controller
 */
bilgezControllers.controller('login', ['$scope', '$location','RestApiClientService', function ($scope, $location, RestApiClientService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (customer) {
        RestApiClientService.post('login', {
            customer: customer
        }).then(function (results) {
            RestApiClientService.toast(results);
            if (results.status == "success") {
                $location.path('#!/');
            }
        });
    };
}]);
/*
 * SignUp Controller
 */
bilgezControllers.controller('signup', ['$scope', '$location', 'RestApiClientService', function ($scope, $location, RestApiClientService) {
 
    $scope.signup = {};
    $scope.alerts = [];
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
 
    $scope.signUp = function (customer) {
        RestApiClientService.post('signup', customer).then(function (results) {
            RestApiClientService.toast(results);
            if (results.status == "success") {
                $scope.alerts.push( "basarili");
                //$location.path('#!/');
            }
        });
    };
}]);