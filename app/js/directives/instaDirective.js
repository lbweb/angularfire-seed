/* jshint camelcase:false*/
/* global Firebase */
'use strict';


app.directive('instaDirective', function(Instapile) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            index: '@index',
            post: '=data'
        },
        templateUrl: '../../views/templates/directive.instaDirective.html',
        link: function(scope, elem, attrs) {
            scope.pinIt = function(id) {
                var tempObj = {};
                scope.post.pinned = true;
                angular.copy(scope.post, tempObj);
                tempObj.pinned_time = Date.now();
                Instapile.add(tempObj).then(function(ref) {
                    var id = ref.name();
                });
            };
        }
    };
});