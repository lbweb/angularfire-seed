'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('DataBoxCtrl', function($scope, $log, $firebase, Databox, user, $modal, $rootScope) {



    /**
    SET DEFAULTS
    **/

    function resetDataBox() {
        $scope.databox = {
            name: '',
            created: '',
            modified: '',
            userId: '',
            isActive: false,
            isOwner: false
        };
    }

    //deal with later;
    $scope.isLoaded = true;


    $scope.addDataboxToUser = function(i, a) {
        a.isOwner = false;
        Databox.addOthers(i, a).then(function(returned) {
            console.log(returned);
        });
    };
    /**
    FIREBASE
    **/

   Databox.initialLoad(user.uid).then(function(x){
         $scope.databoxes = Databox.list();
 });


    $rootScope.$watch('activeDataBox', function(newValue, oldValue) {
              $scope.activeDataBox =  newValue;
      });
  
   //$scope.userList = User.listUsers();


    var newDataBoxModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.newDatabox.html',
        show: false
   });


    $scope.showDataBoxModal = function() {
        newDataBoxModal.$promise.then(newDataBoxModal.show);
    };

    $scope.makeActive = function(id) {
        Databox.setActive(id, function(val) {
            console.log(val);
        });
    };

    $scope.saveDatabox = function() {

        $scope.databox.created = Date.now();
        $scope.databox.modified = Date.now();
        $scope.databox.isOwner = true;
         $scope.databox.isActive = false;
        Databox.create($scope.databox).then(function(data) {
            console.log('data from Firebase' + data);
            resetDataBox();
            newDataBoxModal.hide();
        });

    };

    $scope.removeDatabox = function(ref) {
        console.log(ref)
        Databox.delete(ref).then(function(ref) {
            console.log(ref.name());
        });
    };


    resetDataBox();




});