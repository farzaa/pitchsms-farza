var schools = require('./converted.json');
var zipcodes = require('./zipcode-locations.json');
var geolib = require('geolib')

// Callback
retrieveSchoolList('33028', function(list) {
  console.log(list);

});


function retrieveSchoolList(zipKey, callback) {
  var lat = null;
  var lon = null;
  var schoolList = [];

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

    // Callback when we have exhausted our list.
    if(i == schools.length -1)
      callback(schoolList);

    var obj = schools[i];
    var addr = obj.Address;
    var inst = obj.Institution;
    var schoolLat = obj.Latitude;
    var schoolLon = obj.Longitude;

    // Lets check if this school is in the radius of that lat/lon found above from the zipcode.
    var isInCircle = geolib.isPointInCircle({latitude: schoolLat, longitude: schoolLon},
                                            {latitude: lat, longitude: lon},
                                            10000
    );

    // If its in the circle, lets add it to our list.
    if(isInCircle){
      schoolList.push(inst)
    }

  }
}