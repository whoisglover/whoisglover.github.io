// code freeze 7:41pm Wednesday
var app = angular.module('gemStore', []);

app.controller('StoreController', function($scope){
  this.payees = gems;

});

app.controller('PanelController', function($scope){
  $scope.selectionType = 'business';
  $scope.newPayee = new Payee('business');
  $scope.searchResults = {};
  $scope.selectType = function(selection){
    // dont clear form if same button selected
    if($scope.selectionType === selection){
      return;
    }
    $scope.selectionType = selection;
    $scope.newPayee = new Payee(selection);
  };
  $scope.isSelected = function(checkTab){
    return $scope.selectionType === checkTab;
  };
  $scope.addPayee = function(){
    // debugger;
    console.log("addPayee function fired");
    gems.push($scope.newPayee);
    $scope.newPayee = new Payee($scope.selectionType);
  };
  $scope.searchGoogle = function(){
    if($scope.newPayee.name.length === 0){
      // no search on final backspace clearing input
      return;
    }












  };


});


var gems = [

{
  name:'Danny Glover',
  address: '1042 clay st',
  type: 'person',
  canPay:false,
  addedOn: 1,
  image: 'person.png'
},
{
  name:'Plastiq',
  address: '1475 Folsom street',
  type: 'business',
  canPay:true,
  addedOn: 2,
  image: 'person.png'
}

];

var Payee = function(type, name, address, details){
  this.name = "";
  this.address = "No address provided.";
  this.type = type;
  if(type === 'business'){
    this.canPay = true;
    this.image = 'business.png'
  }else if(type =='person'){
    this.canPay = false;
    this.image = 'person.png'
  }
};


<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <script type="text/javascript" src="angular.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body ng-controller="StoreController as store">

    <div class="payee"  ng-repeat="payee in store.payees | orderBy:'addedOn' | limitTo: 3">
      <img ng-src="{{payee.image}}">
      <h1>{{payee.name}}</h1>
      <p>{{payee.address}}</p>
      <button ng-show="payee.canPay">Hi</button>
    </div>

    <div class="payeeInput rounded" ng-controller="PanelController as panel">
      <button ng-click="selectType('business')" ng-class ="{active: isSelected('business')}" class="">Business</button>

      <button ng-click="selectType('person')" ng-class ="{active: isSelected('person')}" class=""><span>Person</span></button>
      <form name="newPayeeForm" ng-submit="addPayee()">


      <input ng-model="newPayee.name" ng-change="searchGoogle()"ng-show="isSelected('business')" class="" placeholder="What business would you like to pay?"></input>
      <input ng-model="newPayee.name" ng-show="isSelected('person')" class="" placeholder="What person would you like to pay?"></input>
      <input type="submit" value="Submit" />
      </form>
      <p>      {{newPayee}}</p>

    </div>

  </body>
</html>





