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
                    return data;
                })
        }
        authFactory.logout = function(){
            token.setToken();
        }
        
        authFactory.isLoggedIn = function (){
            if(token.getToken())
                return true;
            else
                return false;
        }
        authFactory.getuser = function(){
            if(token.getToken())
                return $http.get('api/me');
            else
                return $q.reject({ message:"User has no token" })
        }
        
    })