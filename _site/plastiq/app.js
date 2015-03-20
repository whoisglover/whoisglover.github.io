
var app = angular.module('gemStore', []);

app.controller('StoreController', function($scope){
  this.payees = starters;

});

app.controller('PanelController', function($scope){
  $scope.selectionType = 'business';
  $scope.newPayee = new Payee('business');
  $scope.placeholder = "What " + $scope.selectionType + " do you want to pay by card?"
  $scope.blurPlaceholder = "What " + $scope.selectionType + " do you want to pay by card?"
  $scope.focusPlaceholder = "Enter the name of the " + $scope.selectionType +"..."
  $scope.searchResults = [];
  $scope.selectType = function(selection){
    // dont clear form if same button selected
    if($scope.selectionType === selection){
      return;
    }
    $scope.searchResults = [];
    $scope.selectionType = selection;
    $scope.newPayee = new Payee(selection);
    $scope.placeholder = "What " + $scope.selectionType + " do you want to pay by card?"
    $scope.blurPlaceholder = "What " + $scope.selectionType + " do you want to pay by card?"
    $scope.focusPlaceholder = "Enter the name of the " + $scope.selectionType +"..."
  };
  $scope.isSelected = function(checkTab){
    return $scope.selectionType === checkTab;
  };
  $scope.addPayee = function(){
    console.log("addPayee function fired");
    if($scope.newPayee.name){
      $scope.newPayee.addedOn = Date.now();
      starters.push($scope.newPayee);
      $scope.newPayee = new Payee($scope.selectionType);
      $scope.searchResults = [];
      $('.submitNewPayee').css({
        'animation-name': 'new-payee-fired',
        'animation-duration': '1s',
        'animation-timing-function': 'ease'
      })
      setTimeout(function(){
        $('.submitNewPayee').css({
        'animation-name': '',
        })
      }, 1000);
    }
  };
  $scope.searchGoogle = function(){
    if($scope.newPayee.name.length === 0){
      $scope.searchResults = []
      //change this to slide up
      // no search on final backspace clearing input
      return;
    }
    $scope.searchResults = [];
    var service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: $scope.newPayee.name},
      function(predictions, status) {
        if(status=='OK'){
          for(var i=0;i< predictions.length;++i){
            if(predictions[i]){
              (function(i){
                var n = document.getElementById('test-list'),
                s = new google.maps.places.PlacesService(n),
                p = predictions[i].description;
                s.getDetails({reference:predictions[i].reference},
                  function(details,status){
                    setTimeout(function(){
                      if(details){
                        $scope.searchResults.unshift(details);
                      }
                      $scope.$apply();
                    }, 300);
                  }
                );
              })(i);
            }
          }
        }
      }
    );
  };
  $scope.searchResultClicked = function(selection){
    console.log('in search result clicked selection is:' + selection)
    $scope.newPayee = new Payee('business', selection.name, selection.formatted_address, selection);
    // debugger
    $scope.searchResults = [];
  };

  $scope.highlight = function(text, search) {
    if (!search) {
        return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<b>$&</b>'));
};
});

app.filter('boldResult', function($sce){
  return function(str, query){
    var result = str.replace(new RegExp(query, 'gi'), function(match) {
      return "<b>" + match + "</b>";
    });
    // debugger
    return $sce.trustAsHtml(result)
  };
});


var starters = [

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
  image: 'business.png'
}

];

var Payee = function(type, name, address, details){
  this.name = name || "";
  this.address = address || "No address provided.";
  this.type = type || 'business';
  this.details = details || {};
  if(type === 'business'){
    this.canPay = true;
    this.image = 'business.png'
  }else if(type =='person'){
    this.canPay = false;
    this.image = 'person.png'
  }
};







