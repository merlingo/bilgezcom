//#################INDEX.HTML ICIN ANGULARJS KODLARI BURAYA YAZILACAK#############
'use strict';
/* App Module */
var bilgezApp = angular.module('bilgez', ['ngRoute', 'bilgezControllers']);
bilgezApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/main.html',
                controller: 'ucusCtrl'
            }).when('/ucus', {
                templateUrl: '/partials/ucusarama.html',
                controller: 'ucusCtrl'
            });
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
