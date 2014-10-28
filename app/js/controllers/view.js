/* jshint camelcase:false */

'use strict';

/**
 * @ngdoc function
 * @name instaViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instaViewApp
 */

app.controller('ViewCtrl', function($scope, instaAPI, $log, Instapile, $rootScope) {




    $rootScope.$watch('activeDataBox', function(newVal, oldVal) {
        if (newVal !== undefined) {
        	Instapile.loadUp().then(function() {
            $scope.instapile = Instapile.list();
        	});
        }
       
    });




});