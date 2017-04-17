var toTwilioText = function(list) {
  if(list.length > 1) {
    var baseMsg = "<Response><Message>EsportsEDU schools around you!: "
    baseMsg += list[0];
    for(var i = 1; i < list.length; i++) {
      baseMsg += ", " + list[i];
    }
    baseMsg += "!</Message></Response>";
    return baseMsg;
  } else {
    return "<Response><Message>Unfortunately there aren't any schools around you :(</Response></Message>";
  }
}

module.exports = toTwilioText;
