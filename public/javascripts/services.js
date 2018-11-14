serviceModule = angular.module('bilgezServices', ['ngResource', 'ngAnimate', 'toaster']);

//ilk ekranda uçuşları aramak için servis
serviceModule.factory('ucus', ['$resource', function ($resource) {
    return $resource('/API/ucus', {}, {
        ara: { method: 'POST', isArray: true },
        getir: {
            url:"/API/ucus/:id",
            method: 'GET',
            isArray: false,
            params: { id: '@id' }
        }
    });
}]);

//ilk ekranda uçuşları aramak için servis
serviceModule.factory('bul', ['$resource', function ($resource) {
    return $resource('/API/havalimani/:sehir', {sehir:'@sehir'}, {
        ara: { method: 'GET', isArray: true }
    });
}]);
//veritabanına havalimani bilgilerini toplu olarak gonderip kaydetmek için
serviceModule.factory('havalimaniKayit', ['$resource', function ($resource) {
    return $resource('/API/havalimani', {}, {
        kaydet: { method: 'POST' }
    });
}]);

serviceModule.factory("RestApiClientService", ['$http', 'toaster',"token",
    function ($http, toaster, token) { // This service connects to our REST API

        var serviceBase = '/membership/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                if(q=="login")
                    token.setToken(results.data.token)
                return results.data;
            });
        };

       obj.post = function (q, object) {
           var parameter = JSON.stringify(object);
             return $http({
                    method: 'POST',
                    url: serviceBase + q,
                    data: parameter,
                    timeout: 4000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
             }).then(function (results) {
                 if (results.data.token) { 
                         token.setToken(results.data.token);
                         console.log("kayit edildi!");
                    }
                    console.log(results.data);
                    return results.data;
                },function(e){

                    var err = {status:"error",message:"An Internal Error Occured", content:e};
                    return err;
                });
            };

        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
       };
        obj.logout = function () {
            token.setToken();
        };
        obj.isloggedIn = function () {
            if (token.getToken())
                return true;
            else
                return false;
        };
        obj.getUser = function () {
            if (token.getToken()) 
                return $http.get("/membership/me");
            else
                return { message: "user has no token" };            
        }
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);
serviceModule.factory('UserService', ['$http', 'token', function ($http, token) {
    return {
        getUser: function () {
            if (token.getToken())
                return $http.get("/membership/me").then(function (results) {
                    console.log("me geldi: " + JSON.stringify(results.data));
                    return results.data;
                });
            else
                return false;
        },
        outUser: function () {
            if (token.getToken())
                token.setToken();
            return false;
        }
    }

}]);
serviceModule.factory("token", ["$window", function ($window) {

    var authTokenFactory = {};
    authTokenFactory.getToken = function () {
        return $window.localStorage.getItem("token");

    }
    authTokenFactory.setToken = function (token) {
        if (token)
            $window.localStorage.setItem('token', token);
        else
            $window.localStorage.removeItem('token');

    }
    return authTokenFactory;
}]);

//serviceModule.factory("AuthInterceptor", function ($q, $location, token) {
//    var interceptor = {};
//    interceptor.request = function (config) {
//        var token = token.getToken();
//        if (token) {
//            config.headers['x-access-token'] = token;

//        }
//        return config;
//    };
//    interceptor.response = function(response) {
//        if (response.headers('New-Jwt-Token')) {
//            console.log(response.headers('New-Jwt-Token'));
//        }
//        return response;
//    }
//    return interceptor;
//});