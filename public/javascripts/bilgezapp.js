//#################INDEX.HTML ICIN ANGULARJS KODLARI BURAYA YAZILACAK#############
'use strict';
/* App Module */
var bilgezApp = angular.module('bilgez', ['ngRoute', 'bilgezControllers','authService']);
bilgezApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/main.html',
                controller: 'ucusCtrl'
            }).when('/ucus', {
                templateUrl: '/partials/ucusarama.html',
                controller: 'ucusAramaCtrl'
            });
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
