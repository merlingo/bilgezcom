//#################INDEX.HTML ICIN ANGULARJS KODLARI BURAYA YAZILACAK#############
'use strict';
/* App Module */
var bilgezApp = angular.module('bilgez', ['ngRoute', 'ngAnimate', 'toaster', 'bilgezControllers', 'bilgezServices', 'angularFileUpload', "ui.bootstrap"]);
bilgezApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/main.html',
                controller: 'ucusCtrl'
            }).when('/havalimani', {
                templateUrl: '/partials/havalimani.html',
                controller: 'havalimaniCtrl'
            }).when('/ucuslar/:nereden/:nereye/:checkin/:checkout/:yet/:cocuk', {
                title: 'ucuslar',
                templateUrl: 'partials/ucuslar.html',
                controller: 'ucuslarCtrl'
            }).when('/ucuslar/:ucusid', {
                title: 'ucuslar',
                templateUrl: 'partials/ucusbilgileri.html',
                controller: 'ucusbilgiCtrl'
            })
            .when('/login', {
              title: 'Login',
              templateUrl: 'partials/login.html',
             controller: 'login'
            })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/main.html',
                controller: 'login'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'signup'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
bilgezApp.directive('focus', function () {
    return function (scope, element) {
        element[0].focus();
    }
});

bilgezApp.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                if (e2 != null)
                    return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);