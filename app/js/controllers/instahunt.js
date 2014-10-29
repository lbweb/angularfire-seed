/* jshint camelcase:false */

'use strict';

/**
 * @ngdoc function
 * @name instaViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instaViewApp
 */

app.controller('InstaCtrl', function($scope, instaAPI, $log, Instapile, $rootScope, tempInsta, User) {


    $scope.queryTerms = tempInsta.queryterms;
    $scope.InstaList = tempInsta.instaPosts;
    $scope.currentSearchQuery = tempInsta.currentSearchQuery;
    var counter = tempInsta.counter;
    $scope.showLoading = false;
    $scope.showTagResult = false;
    var InstaPileList = tempInsta.instaPileList;
    var currentMinTag;

    var showTagLoading = function() {
        $scope.showLoading = true;
    };

    //Load Up Instagram List
    $rootScope.$watch('activeDataBox', function(newVal, oldVal) {
        if (newVal !== undefined) {
            Instapile.loadUp().then(function() {
                console.log('loaded');
                tempInsta.initalized = true;
                tempInsta.instaPileList = Instapile.list();
                InstaPileList = Instapile.list();
                //WATCH FOR FURTHER CHANGES on InstaPile Object

                Instapile.list().$watch(function(event) {
                    //get the key of the changed object
  


                    var changedObj = Instapile.get(event.key);

                    //console.log(changedObj);
                    //loop through each instaitem on the screen
                    
                    angular.forEach($scope.InstaList, function(obj, key) {
                        if (obj.id === changedObj.id) {
                            //if match found, make sure you "Pin it" to avoide double data-entry.
                            tempInsta.instaPileList[key].pinned = true;
                            $scope.InstaList[key].pinned = true;
                        }
                    });
                });

                // END WATCH FOR CHANGES
            });
        }
    });

    



    var showTagResult = function() {
        $scope.showLoading = false;
        $scope.showTagResult = true;
    };



    var runInstaQuery = function(queryTerms, max_id) {


        instaAPI.getTagQuery(queryTerms, max_id).success(function(InstaObject) {

            tempInsta.nextMaxTag = InstaObject.pagination.next_max_tag_id;
            tempInsta.currentMinTag = InstaObject.pagination.min_tag_id;


            angular.forEach(InstaObject.data, function(value, key) {
                angular.forEach(InstaPileList, function(instaValue, key) {
                    if (instaValue.id === value.id) {
                        value.pinned = true;
                    }
                });
                //once pin is applied (if it exists) add to scoep array
                tempInsta.instaPosts.push(value);
                //$scope.InstaList.push(value);

            }); //end new array



        })
            .error(function(data) {
                //erorr if InstaItems don't load
                $log.info(data);
            });
    };

    $scope.clearSheet = function() {
        console.log('clearSheet');
        tempInsta.instaPileList.length = 0;
        $scope.InstaList.length = 0;

        console.log( $scope.InstaList );
        tempInsta.queryterms = '';
        tempInsta.currentSearchQuery = '';
        tempInsta.counter =  0;
        tempInsta.initalized = false;
        tempInsta.nextMaxTag = 0;
        
        $scope.queryTerms = tempInsta.queryterms;
        $scope.InstaList = tempInsta.instaPosts;
        $scope.currentSearchQuery = tempInsta.currentSearchQuery;

    };

    $scope.loadResultsBtnClick = function() {
        runInstaQuery($scope.queryTerms);
    };

    $scope.loadPreviousQuery = function() {

                        $scope.clearSheet();

        User.getPreviousQuery().then(function(data){
                

                tempInsta.currentSearchQuery = data.queryTerms;
                tempInsta.nextMaxTag = data.maxTag;
                $scope.queryTerms = tempInsta.queryterms;
                $scope.currentSearchQuery = tempInsta.currentSearchQuery;
                runInstaQuery(tempInsta.currentSearchQuery, tempInsta.nextMaxTag);

        })
        
    };

    $scope.loadMorePosts = function() {
        runInstaQuery(tempInsta.currentSearchQuery, tempInsta.nextMaxTag);
    };

    $scope.saveMySpot = function() {

        User.saveMySpot(tempInsta.currentMinTag, tempInsta.currentSearchQuery).then(function() {
            console.log('this has been saved');
        });
        //User.saveMySpot($rootScope.activeDataBox, nextMaxTag);
    };

    $scope.searchEntered = function() {
        $scope.showTagResult = false;

        $scope.queryTerms = $scope.currentSearchQuery;
        tempInsta.currentSearchQuery = $scope.currentSearchQuery;
        tempInsta.queryTerms = $scope.queryTerms;
        showTagLoading();
        instaAPI.getTagCount($scope.queryTerms).then(function(d) {
            $scope.queryResults = d.data.data.media_count;
            showTagResult();
        });
    };



});