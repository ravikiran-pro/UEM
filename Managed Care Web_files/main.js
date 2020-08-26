var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.addService = function(service){
	    var counter=0;
	    // console.log($scope.selectedServices);
            $scope.selectedServices = JSON.parse(localStorage.getItem("services"));
	      //           console.log($scope.selectedServices);
	    // $scope.selectedServices.push(service);
	     for(i=0;  i<$scope.selectedServices.length; i++){
                    if($scope.selectedServices[i] == service)
                            counter++
            }
            if(counter == 0){
                    $scope.selectedServices.push(service);
            }

	    localStorage.setItem("services",JSON.stringify($scope.selectedServices));
    }
    $scope.init = function(){
           if( localStorage.getItem("services") == null ){
             $scope.selectedServices = [];
	    localStorage.setItem("services",JSON.stringify($scope.selectedServices));
	   }
	    else{
               $scope.selectedServices = JSON.parse(localStorage.getItem("services"));
	    }
	    console.log($scope.selectedServices);
    }
    $scope.validateForm = function(){
	     var name = $("#name").val();
	     var phone = $("#phone").val();
	     var loc = $("#location").val();
	     var lang = $("#language").val();
	    if(name.length == 0 || phone.length == 0 || loc.length == 0 || lang.length == 0){
		    alert('Please fill all fields');
	    }
	    else{
		    $http({
			    url: 'http://52.172.157.13:8090/create',
                            method: "POST",
                           data: { 'firstName' : name, 'lastName':'', 'mobile': phone, 'location': loc, 'language': lang }
                       })
                       .then(function(response) {
		                       top.location.href="customer_support.html";
			           localStorage.removeItem("services"); 
                       },
                       function(response) { // optional
		                       top.location.href="customer_support.html";
			           localStorage.removeItem("services"); 
                       });
	    }
    }
})
.filter("removeDups", function(){
  return function(data) {
    if(angular.isArray(data)) {
      var result = [];
      var key = {};
      for(var i=0; i<data.length; i++) {
        var val = data[i];
        if(angular.isUndefined(key[val])) {
          key[val] = val;
          result.push(val);
        }
      }
      if(result.length > 0) {
        return result;
      }
    }
    return data;
  }
});
