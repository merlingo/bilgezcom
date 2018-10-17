/* chapter5/controllers.js */
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
bilgezControllers.controller('havalimaniCtrl', ['$scope', 'havalimaniKayit',
    function ucusCtrl($scope, havalimaniKayit) {
        $scope.shown = false;
        $scope.kaydet = function (hvj) {
            havalimaniKayit.kaydet(hvj);
            havalimaniKayit.$promise.then(function (msg) {
                $scope.alert = msg;
                $scope.alertType = "success";

            }).catch(function (e) {
                $scope.alertType = "danger";
                $scope.alert = e.status;
                throw e;
            }).finally(function () {
                $scope.shown = "true";
                });
        }
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