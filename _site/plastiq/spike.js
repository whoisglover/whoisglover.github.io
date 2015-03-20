SPIKE!

Ajax call from site to site - cross side scripting dummy, switch to API
 // https://maps.googleapis.com/maps/api/place/textsearch/json?location=-33.8670522,151.1957362&radius=500&key=AIzaSyCy6ik_XyJ5WSjKP1bkGCNYDH-g97sezWY&query=coffe
    var url = 'https://www.maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCy6ik_XyJ5WSjKP1bkGCNYDH-g97sezWY'

    //stubbed until hosted, see code at bottom of this file for unstubbing
    var search_lat = "37.772014";
    var search_long = "-122.413650";
    var radius = 500;
    if(search_lat.length && search_long.length){
      url = url + '&location=' + search_lat +','+search_long + '&radius=' + radius
    }
    url = url +'&query=' + this.newPayee.name;
    url = encodeURI(url);
    url ='https://maps.googleapis.com/maps/api/place/textsearch/json?location=-33.8670522,151.1957362&radius=500&key=AIzaSyCy6ik_XyJ5WSjKP1bkGCNYDH-g97sezWY&query=dogs'
    console.log('url is:' + url)
    $.ajax({
      url: url,
      // dataType: 'JSONP',
      success: function(response){
        debugger
      }
    })


    var lat = "0";
    var longitude = "0";
    function showPosition(position) {
        console.log('in showPosition')
        lat = position.coords.latitude;
        longitude = position.coords.longitude;
    }
    function errorPosition() {
        console.log('in ERROROROR');
    }
    function getLocation() {
      if (navigator.geolocation) {
          console.log('in getLocation')
          navigator.geolocation.getCurrentPosition(showPosition, errorPosition, {timeout:3000});
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
    }