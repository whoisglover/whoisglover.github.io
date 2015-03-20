var service  = new google.maps.places.AutocompleteService();
var search_results = []
var query = 'star'
service.getPlacePredictions({ input: 'star' },
  function(predictions, status) {
    if(status=='OK'){
      for(var i=0;i< 5;++i){
        if(predictions[i]){
          (function(i){
            var n = document.getElementById('ol'),
            s = new google.maps.places.PlacesService(n),
            p = predictions[i].description;
            var y = {}
            y.name_offset = predictions[i].matched_substrings;
            s.getDetails({reference:predictions[i].reference},
              function(details,status){
                y.name = details.name
                y.details = details
                search_results.push(y)
              });
          })(i)
        } //
      } //
    } //
  } //
); //