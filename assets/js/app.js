var app = angular.module('app', ['ngResource','ngRoute','ui.router','ngCookies']);


app.config(['$routeProvider','$locationProvider','$httpProvider','$stateProvider','$urlRouterProvider', function($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {    
    // $routeProvider.
    // when('/form', {
    //     templateUrl: '/templates/form.html'
    // }).
    // when('/list', {
    //     templateUrl: '/templates/list.html'
    // }).
    // when('/test', {
    // 	templateUrl: '/templates/test.html'
    // }).
    // otherwise({ redirectTo: '/'});
    
    // $locationProvider.html5Mode({enabled: false, requireBase: false }); 
    // //*********
    // $urlRouterProvider.otherwise('/');
 
    // $stateProvider
    //     .state('form', {
    //         url:'/form',
    //         templateUrl: '/templates/form.html'
    //     })
    //     .state('list', {
    //         url:'/list',
    //         templateUrl: '/templates/list.html'
    //     })


  $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.localStorage.accessToken) {
          config.headers['auth-token'] = $window.localStorage.accessToken;
          console.log(config.headers);
        }
        return config;
      },
      responseError: function (response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/access');
        }
        return $q.reject(response);
      }
   };
  }]);  
}]);

// app.run(['$rootScope','$location','$http','$window','$cookieStore', function ($rootScope, $location, $http, $window, $cookieStore) {
//   console.log('This is a fucking request');
//   $http.defaults.headers.common['Authorization'] = 'bolinha';
//   //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage.accessToken;
//   console.log($http.defaults.headers.common['Authorization']);
//         // // keep user logged in after page refresh
//         // $rootScope.globals = $cookieStore.get('globals') || {};
//         // if ($rootScope.globals.currentUser) {
//         //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         // }
  
//         // $rootScope.$on('$locationChangeStart', function (event, next, current) {
//         //     // redirect to login page if not logged in
//         //     if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//         //         $location.path('/login');
//         //     }
//         // });
//     }]);

// app.factory("Person", ["$resource", function($resource){    
//     return $resource("/api/Person/:id"); 
// }]);


app.factory('authentication', ['$http','$window', function ($http, $window) {
  return {
    require: function(key){     
      return $http.post('/access/key', { key: key }).then(function(response){
        if(response.data.success)
          $window.localStorage.accessToken = response.data.token;
        return response.data;
      });
    }
  };
}]);


app.factory("contextFactory",["$resource", "$http", function($resource, $http){    
    return function(controllers){
        var context = {};
        for(var i in controllers){
            context[controllers[i].toLowerCase()] = $resource("/api/" + controllers[i].toLowerCase() + "/:id", null, { "getStruct" : { method: "GET", url: "/models/" + controllers[i].toLowerCase() + ".json"} });
        }
        return context;
    };
}]);

app.directive('struct', function() {
  return {
      scope:{
        name: '=',  
        type: '='  ,
        placeholder: '=',
        maxlength: '='
      },
      link: function(scope, element, attrs) {
          attrs.$set("name", scope.name);
          attrs.$set("type", scope.type);
          attrs.$set("placeholder", scope.placeholder);
          attrs.$set("maxlength", scope.maxlength);
      } 
  };
});