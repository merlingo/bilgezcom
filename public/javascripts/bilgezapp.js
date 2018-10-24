//#################INDEX.HTML ICIN ANGULARJS KODLARI BURAYA YAZILACAK#############
'use strict';
/* App Module */
var bilgezApp = angular.module('bilgez', ['ngRoute', 'bilgezControllers', 'bilgezServices', 'angularFileUpload', "ui.bootstrap"]);
bilgezApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/main.html',
                controller: 'ucusCtrl'
            }).when('/havalimani', {
                templateUrl: '/partials/havalimani.html',
                controller: 'havalimaniCtrl'
            })
       
            .when('/login', {
              title: 'Login',
              templateUrl: 'partials/login.html',
             controller: 'login'
            })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'login'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'signup'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'dashboard'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'login',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
