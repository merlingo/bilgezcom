/* chapter5/controllers.js */
'use strict';
/* Controllers */
var bilgezControllers = angular.module('bilgezControllers', []);
//bilgezControllers.constant("Modernizr", Modernizr);

bilgezControllers.controller('ucusCtrl', ['$scope', '$window',
    function ucusCtrl($scope, $window) {
        //ucusGirdi View Model yaratilir
        //$scope.ucusgirdi.nereden = "İstanbul";
        $scope.ucusara = function (ucusgirdi) {
           // $scope.ucusgirdi = { nereden: $scope.nereden };
            //http ile sunucuya gönder
            var nereye =ucusgirdi.nereye;
            $window.alert(nereye);
            $window.localstorage.token = "token";
            $window.localstorage.userid = "token";

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