var schools = require('./converted.json');
var zipcodes = require('./zipcode-locations.json');

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

function retreiveLatLon(zipCode) {

  for(var i = 0; i < schools.length; i++) {
    var obj = schools[i];
    var addr = obj.Address;
    var zip = addr.match('\s{1}[0-9]{5}');
    console.log(zip);

    //console.log(zipcodes[zip]);

    // for(var zip in zipcodes) {
    //   var zip = zipcodes[zip];
    //   addr.match('\s{1}[0-9]{5}');
    // }

    if(zipCode == zip) {

    } 

  }
}