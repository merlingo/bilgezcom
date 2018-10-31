serviceModule = angular.module('bilgezServices', ['ngResource', 'ngAnimate', 'toaster']);

//ilk ekranda uçuşları aramak için servis
serviceModule.factory('ucus', ['$resource', function ($resource) {
    return $resource('/API/ucus', {}, {
        ara:{method:'POST',isArray:true}
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
//{
//    method: 'POST',
//        url: url,
//            data: data,
//                timeout: 4000
//}
serviceModule.factory("RestApiClientService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

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
                    if (q == "login")
                        token.setToken(results.data.token)
                    console.log("kayit edildi!");
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
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);
    