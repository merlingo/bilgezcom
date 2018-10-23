angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider, $locationProvider){
    
    $routeProvider
    .when('/',{
        
        templateUrl: 'partials/main.html'
    })
    
    .when('/login',{
        
        templateUrl:'partials/login.html'
    })
    
    $locationProvider.html5mode(true);
})