'use strict';

/**
 * @ngdoc overview
 * @name ttvnGenerator
 * @description
 * # ttvnGenerator
 *
 * Main module of the application.
 */
var app = angular
  .module('ttvnGenerator', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

