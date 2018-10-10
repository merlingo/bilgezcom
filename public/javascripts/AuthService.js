angular.module('authService', [])
    .factory('Auth', function ($http, $q, token) {

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
    })