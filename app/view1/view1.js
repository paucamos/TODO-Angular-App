'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$scope", function($scope) {
  $scope.newResource = "";
  $scope.Llista = [
      {
          name: $scope.newResource
      }
  ];

  $scope.addResource = function(newResource) {
    $scope.Llista.push(newResource);
    $scope.newResource ="";
  };

  $scope.addResourceByEnter = function(e, newResource){
    if(e.charCode == "13"){
        $scope.addResource(newResource);
    }
  };

  $scope.removeResource = function ($index) {
    $scope.Llista.splice($index, 1);
  };

  $scope.completeResource = function ($index) {
    if ($scope.Llista.find($index) == 1)  {
        $scope.Llista.find($index).addClass('is-done');
    } 
  };

}]);
