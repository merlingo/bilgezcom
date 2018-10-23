angular.module('authservice',[])



.factory('auth',function($http,$q,authtoken){
    
    var authfactory = {};
    
    authfactory.login = function(username,password){
        
        return $http.post('/api/login',{
            username:username,
            password:password
            
        })
        .success(function(data){
            authtoken.settoken(data.token);
            return data;
            
        })
        
    }
    
    authfactory.logout = function(){
        authtoken.settoken();
        
    }
    
    authfactory.isloggedIn = function(){
        if(authtoken.gettoken())
            return true;
        else
            return false;
        
    }
    
    authfactory.getuser = function(){
        
        if(authtoken.gettoken())
            return $http.get('api/me');
        else
            return $q.reject({message:"user has no token"})
    }
    
    return authfactory;
    
})

.factory('authtoken', function($window){
    
    var authtokenfactory ={};
    
    authtokenfactory.gettoken = function() {
        return $window.localStorage.getItem('token');
        
        
    }
    authtokenfactory.settoken = function(token){
        
        if (token)
            
            $window.localStorage.setItem('token',token);
        else
            $window.localStorage.removeItem('token');
    }
    
   return authtokenfactory; 
});
         
.factory('AuthInterceptor', function($q,$location,Authtoken){
    
    var interceptorfactory ={};
    
    interceptorfactory.request = function(config){
        var token = authtoken.gettoken();
        if (token){
            
            config.headers['x-access-token']= token;
            
        }
        return config;
    };
    interceptorfactory.responseError= function(response){
        
        if(response.status == 403)
            $location.path('/login');
        return $q.reject(response);
    }
    
    
    return interceptorfactory;
});

    
    
        
        
        



