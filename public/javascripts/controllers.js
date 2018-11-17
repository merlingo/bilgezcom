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

bilgezControllers.controller('headerCtrl', ['$scope', '$window','UserService',
    function ($scope, $window, UserService) {
        var user = UserService.getUser();
        console.log("headerda user:" + JSON.stringify(user));
        $scope.uyemi = false;

        if (user) {
            user.then(function (data) {
                console.log("user var:" + data.name);
                $scope.uyemi = true;
                $scope.uyeadi = data.name;
            });
        }
        $scope.cikis = function () {
            UserService.outUser();
            $scope.uyemi = false;
        }
        $scope.giris = function () {
           // UserService.outUser();
            $scope.uyemi = true;
            $window.location.href = "/#!/";
        }
        
    }
]);
bilgezControllers.controller('ucusCtrl', ['$scope','$window','$location',"$http",'ucus',
    function ucusCtrl($scope, $window, $location, $http, ucus) {

        //ucusGirdi View Model yaratilir
        //$scope.ucusgirdi.nereden = "İstanbul";
        $scope.ucusgirdi = {
            checkin: new Date(),
            checkout: new Date(),
            yetismus: "1",
            cocukmus: "1",
            sinif:"Ekonomi"
        };
        $scope.ucusgirdi.checkout.setDate($scope.ucusgirdi.checkin.getDate() + 1);
        $scope.ucusara = function (ucusgirdi) {
           // $window.alert(JSON.stringify(ucusgirdi.nereden))
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TEEEEEEEEEEEEEEEEST OLDUUUUUUUUUUUUUUUUUUU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            //$window.location.href = "/test#!/ucuslar/" + ucusgirdi.nereden.code + "/" + ucusgirdi.nereye.code + "/" + ucusgirdi.checkin + "/" + ucusgirdi.checkout + "/" + ucusgirdi.yetismus + "/" + ucusgirdi.cocukmus;
            $window.location.href = "/#!/ucuslar/" + ucusgirdi.nereden.code + "/" + ucusgirdi.nereye.code + "/" + ucusgirdi.checkin + "/" + ucusgirdi.checkout + "/" + ucusgirdi.yetismus + "/" + ucusgirdi.cocukmus;

            
            
            
            
            
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
        $scope.ucusgirdi = ucusgirdi;
        $scope.aynilink = function () {
            return ucusgirdi.nereden + "/" + ucusgirdi.nereye + "/" + ucusgirdi.checkin + "/" + ucusgirdi.checkout + "/" + ucusgirdi.yetiskin + "/" + ucusgirdi.cocuk ;
        }
        $scope.ucuslist = [];
        ucus.ara(ucusgirdi, function (ucuslist, getResponseHeaders) {
            //console.log(JSON.stringify(ucuslist));
            var u = {};
            for (var ucusno in ucuslist) {
                var ucus = ucuslist[ucusno];
                u = {
                    "_id": ucus._id,
                    nereden: {
                        state: ucus.nereden.state,
                        city: ucus.nereden.city
                    },
                    nereye: {
                        state: ucus.nereye.state,
                        city: ucus.nereye.city
                    },
                    departure: {
                        tarih: "tarih",
                        saat:"saat"
                    },
                    arrival: {
                        tarih: "tarih",
                        saat: "saat"
                    },
                };
                $scope.ucuslist.push(u);
            }
                $scope.ucuslist = ucuslist;
        });
            $scope.sec = function (ucusid) {
                //$window.alert(ucusid);
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TEEEEEEEEEEEEEEEEST OLDUUUUUUUUUUUUUUUUUUU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //$window.location.href = "/test#!/ucuslar/" + ucusid;
                $window.location.href = "/#!/ucuslar/" + ucusid;


            }
    }
    ]);
bilgezControllers.controller('ucusbilgiCtrl', ['$scope', '$window', '$routeParams', 'ucus',
    function ($scope, $window, $routeParams,ucus) {
        var ucusid = $routeParams.ucusid;
        //$window.alert(ucusid);
        $scope.ubilgi = {};
        ucus.getir({ id:ucusid }, function (u, getResponseHeaders) {
            $window.alert(JSON.stringify(u));
            $scope.ubilgi = u;
        });
        $scope.complete = function (bilet) {
            $window.alert("bilet alma işlemi tamamlanmıştır. Aldığınız bilet mail ile gönderilmiştir");
            $window.alert("bilet bilgileri: " + JSON.stringify(bilet));
            //BİLET ALMA REQUEST GONDERILIR DONEN MODEL İLE ALİNANBİLET SAYFASI OLUŞTURULUR VE KULLANICIYA GOSTERİLİR. SUNUCUDA MAIL GONDERILECEKTIR
                            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TEEEEEEEEEEEEEEEEST OLDUUUUUUUUUUUUUUUUUUU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            //$window.location.href = "/test#!/alinanbilet/" + ucusid;
            $window.location.href = "/#!/alinanbilet/" + ucusid;


        }
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
bilgezControllers.controller('login', ['$scope', '$location', '$window', 'RestApiClientService', function ($scope, $location, $window, RestApiClientService) {
 
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
 
    $scope.doLogin = function (customer) {
        RestApiClientService.post('signin', customer).then(function (results) {
           // RestApiClientService.toast(results.message);
            if (results.success == true) {
                $location.path('/');
                $window.location.reload();
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