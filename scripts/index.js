/**
 * app init
 * [app description]
 * @type {[type]}
 */
var app = angular.module('hd', []);
app.controller('myController', ['$scope', function($scope) {
    $scope.name = 'this is my $scope';
}]);
// -> my1 controller test 
app.controller('my1', ['$scope', function() {
    $scope.click = function() {
        alert('1');
        alert(1);
    }
}]);