'use strict';

angular
    .module('portfolioApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'toaster'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/workshop', {
                templateUrl: 'views/workshop.html',
                controller: 'WorkshopCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
