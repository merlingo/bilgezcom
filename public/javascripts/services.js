serviceModule = angular.module('bilgezServices', ['ngResource']);

//ilk ekranda uçuşları aramak için servis
serviceModule.factory('ucus', ['$resource', function ($resource) {
    return $resource('/API/ucus', {}, {
        ara:{method:'POST'}
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

    