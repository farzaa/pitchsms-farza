var schools = require('./converted.json');
var zipcodes = require('./zipcode-locations.json');
var geolib = require('geolib')
var toTwilioText = require('./createTwilioText.js');


// // Export variable when we reach our callback conditon.
// var list = retrieveSchoolList('92602', function(list) {
//   console.log(list);
// });

var createMsg =  function retrieveSchoolList(zipKey) {
  var lat = null;
  var lon = null;
  var schoolList = [];

  // NOTE: There may some issues with node's async nature here if the above search is slow!
  // Check if the user input zip matches from the list of zips we have.
  for(var zip in zipcodes) {
    // We found a match! Extract the lat/lon now.
    if(zip == zipKey) {
      lat = zipcodes[zip][0]
      lon = zipcodes[zip][1]
      break;
    }
  }

  // That zip code couldn't be found from our master list.
  if(lat == null || lon == null)
    callback(schoolList)

  console.log(lat);
  console.log(lon);

  // Cycle through list of schools
  for(var i = 0; i < schools.length; i++) {

    // Callback when we have exhausted our list.
    if(i == schools.length - 1)
      return toTwilioText(schoolList);

    var obj = schools[i];
    var addr = obj.Address;
    var inst = obj.Institution;
    var schoolLat = obj.Latitude;
    var schoolLon = obj.Longitude;

    // Lets check if this school is in the radius of that lat/lon found above from the zipcode.
    var isInCircle = geolib.isPointInCircle({latitude: schoolLat, longitude: schoolLon},
                                            {latitude: lat, longitude: lon},
                                            16100
    );

    // If its in the circle, lets add it to our list.
    if(isInCircle){
      schoolList.push(inst)
    }

  }
}

module.exports = createMsg
