'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
    'myApp.config',
    'myApp.controllers',
    'myApp.decorators',
    'myApp.directives',
    'myApp.filters',
    'myApp.routes',
    'myApp.services',
    'mgcrea.ngStrap'
  ])
  .constant('FIREBASE_URL', 'https://disastermapp.firebaseio.com/')
  .run(function(simpleLogin, $rootScope, Databox) {


    $rootScope.activeDatabox = null; 

    
    $rootScope.LoggedUser = {};
    $rootScope.LoggedUser.uid = null; 

    simpleLogin.getUser().then(function(user){
      if(user){
        console.log('USERID=' + user);
        Databox.initialLoad().then(function(){
            Databox.login(user.uid);
            });
       
      }
      else {
        console.log('no user');
      }
    })
  });
  


