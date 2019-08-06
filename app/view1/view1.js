'use strict';

angular.module('myApp.view1', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]).service("todo",["$window", function($window){

  var Todo = function(idx, name){
    this.name = name;
    this.idx = idx;
  };

  Todo.prototype = {
    name :null,
    idx : null,
    check: false
  };

  var TodoManager = function(){
    var store = $window.localStorage;
    var storageTodo = JSON.parse(store.getItem("todoCollection"));
    this.store = store;
    if(storageTodo){
      this.data = storageTodo;
    }
  };

  TodoManager.prototype = {
    data :[],
    updateStore : function(){
      this.store.setItem("todoCollection", JSON.stringify(this.data));
    },
    addResource : function(text) {
      if(text){
        this.data.push(new Todo(this.data.length,  text));
        this.updateStore();
      }
    },
    addResourceByEnter : function(e, newResource){
      if(e.charCode == "13"){
        this.addResource(newResource.value);
        newResource.value = "";
      }
    },
    removeResource:function (index) {
      this.data.splice(index, 1);
      this.updateStore();
    }/*,
    completeResource : function () {
      this.data.addClass('completed');
    }*/
  };

  return new TodoManager();
}]).
controller('View1Ctrl', ["$scope","todo", function($scope, todo) {
  $scope.newResource = {value:""};
  $scope.todoManager = todo;

}]);
