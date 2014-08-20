'use strict';

angular
    .module('portfolioApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'toaster',

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
            .when('/suchmaschine', {
                templateUrl: 'views/searchengine.html',
                controller: 'SearchengineCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
