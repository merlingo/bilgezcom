//#################INDEX.HTML ICIN ANGULARJS KODLARI BURAYA YAZILACAK#############
'use strict';
/* App Module */
var bilgezApp = angular.module('bilgez', ['ngRoute', 'bilgezControllers', 'bilgezServices', 'angularFileUpload']);
bilgezApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/main.html',
                controller: 'ucusCtrl'
            }).when('/havalimani', {
                templateUrl: '/partials/havalimani.html',
                controller: 'havalimaniCtrl'
            }).when('/signin',{
            templateUrl: '/partials/signin.html'
        })
        
        ;
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
