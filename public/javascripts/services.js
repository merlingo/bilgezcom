serviceModule = angular.module('bilgezServices', ['ngResource']);

//ilk ekranda uçuşları aramak için servis
serviceModule.factory('ucus', ['$resource', function ($resource) {
    return $resource('/API/ucus', {}, {
        ara:{method:'POST'}
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
//login icin gerekli fonksiyon icin servis
serviceModule.factory('login', function ($http, $q, token) {

    var authFactory = {};
    authFactory.login = function (mail, password) {

        return $http.post('/membership/login', {
            username: username,
            password: password
        })
            .success(function (data) {
                token.setToken(data.token)
                return data
            })
    }
});

//login and sign up servisi

app.factory("RestApiClientService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/web/index.php/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {

            obj.post = function (q, object) {
                return $http.post(serviceBase + q, object).then(function (results) {
                    return results.data;
                },function(results){

                    var err = {status:"error",message:"An Internal Error Occured"};
                    return err;
                });
            };
        };

        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);
    