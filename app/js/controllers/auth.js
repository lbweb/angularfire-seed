'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('AuthCtrl', function($scope, Auth, $log, $firebaseSimpleLogin, $location, $modal, $rootScope, Instapile) {



    

    $scope.showLoading = false;
    $scope.registerError = null;
    $scope.errors = [];

    $rootScope.$watch('activeDataBox', function(newVal, oldVal) {
        $scope.activeDataBox = newVal;
        Instapile.loadUp();
    });

   


    $scope.logout = function() {
        $rootScope.activeDataBox = null;
        Auth.logout();
    };

    $scope.isSignedIn = function() {
        return Auth.signedIn();
    };





    var registerModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.register.html',
        show: false
    });



    $scope.showLoginModal = function() {
        //loginModal.$promise.then(loginModal.show);
    };

    $scope.showRegisterModal = function() {
        registerModal.$promise.then(registerModal.show);
    };

    // if ($location.path() === '/login') {
    //     $scope.showLoginModal();
    // }


});