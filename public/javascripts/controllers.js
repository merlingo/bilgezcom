﻿/* chapter5/controllers.js */
'use strict';
/* Controllers */
var bilgezControllers = angular.module('bilgezControllers', []);
//bilgezControllers.constant("Modernizr", Modernizr);

bilgezControllers.controller('ucusCtrl', ['$scope', '$window','ucus',
    function ucusCtrl($scope, $window, ucusara) {
        //ucusGirdi View Model yaratilir
        //$scope.ucusgirdi.nereden = "İstanbul";
        $scope.ucusara = function (ucusgirdi) {
           // $scope.ucusgirdi = { nereden: $scope.nereden };
            //http ile sunucuya gönder
            ucus.ara(ucusgirdi);
            ucus.$promise.then(function (ucuslist) {
                $window.alert(ucuslist[0])

            });
        }
    }]);
bilgezControllers.controller('havalimaniCtrl', ['$scope', 'havalimaniKayit', 'FileUploader',
    function ucusCtrl($scope, havalimaniKayit, FileUploader) {




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
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
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



        //$scope.kaydet = function () {
        //    var f = document.getElementById('file').files[0],
        //        r = new FileReader();

        //    r.onloadend = function (e) {
        //        var data = e.target.result;
        //        //send your binary data via $http or $resource or do anything else with it
        //        $scope.alertType = "primary";
        //        $scope.shown = "true";
        //        console.log('file is ');
        //        console.dir(data);
        //        $scope.alert = data;
        //    }

        //    r.readAsBinaryString(f);
        //    var file = $scope.hvj;


        //    //havalimaniKayit.kaydet(file,
        //    //    function success(res) {
        //    //        $scope.alert = res.msg;
        //    //        $scope.alertType = "success";
        //    //        $scope.shown = "true";
        //    //    }, function error(e) {
        //    //        $scope.alertType = "danger";
        //    //        $scope.alert = e;
        //    //        $scope.shown = "true";
        //    //        throw e;
        //    //    });
                
        //}
    }]);

bilgezControllers.controller('signupCtrl', ['$scope',
    function ucusCtrl($scope) {

        //$scope.browser = {
        //    supportNumberInput: Modernizr.inputtypes.number
        //};
    }]);
//bilgezControllers.controller('BlogViewCtrl',
//    ['$scope', '$routeParams', 'BlogPost',
//        function BlogViewCtrl($scope, $routeParams, BlogPost) {
//            var blogId = $routeParams.id;
//            BlogPost.get({ id: blogId },
//                function success(response) {
//                    console.log("Success:" + JSON.stringify(response));
//                    $scope.blogEntry = response;
//                },
//                function error(errorResponse) {
//                    console.log("Error:" + JSON.stringify(errorResponse));
//                }
//            );
//        }]);