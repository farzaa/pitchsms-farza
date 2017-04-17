var schools = require('./converted.json');
var zipcodes = require('./zipcode-locations.json');
var geolib = require('geolib')

retreiveLatLon('33028');

// Give this fucntion a zip code and it will return a list of schools in the vicinity.
function retreiveSchools(zipCode) {
  for(var i = 0; i < schools.length; i++) {
    var obj = schools[i];
    var lat = obj.Latitude;
    var lon = obj.Longitude;

    console.log(obj.Institution);

  }
}

function retreiveLatLon(zipKey) {

  var lat = null;
  var lon = null;

  // Check if the user input zip matches from the list of zips we have.
  for(var zip in zipcodes) {
    // We found a match! Extract the lat/lon now.
    if(zip == zipKey) {
      lat = zipcodes[zip][0]
      lon = zipcodes[zip][1]
      break;
    }
  }

  // NOTE: There may some issues with node's async nature here if the above search is slow!
  console.log(lat);
  console.log(lon);

  // Cycle through list of schools
  for(var i = 0; i < schools.length; i++) {
    var obj = schools[i];
    var addr = obj.Address;
    var schoolLat = obj.Latitude;
    var schoolLon = obj.Longitude;

    // Lets check if this school is in the radius of that lat/lon found above from the zipcode.
    var isInCircle = geolib.isPointInCircle({latitude: schoolLat, longitude: schoolLon},
                                            {latitude: lat, longitude: lon},
                                            10000
    );

    if(isInCircle){
      console.log(obj.Institution)
      console.log(addr);
    }

  }
}