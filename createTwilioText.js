var toTwilioText = function(list) {
  if(list.length >= 1) {
    var baseMsg = "<Response><Message>EsportsEDU schools around you!: "
    var newMsg = baseMsg;
    newMsg += list[0];
    for(var i = 1; i < list.length; i++) {
      newMsg += ", " + list[i];
    }
    if(list.length >= 5) {
      newMsg += ", and a few others!</Message></Response>";
    } else {
      newMsg += "!</Message></Response>";
    }
    return newMsg;
  } else {
    return "<Response><Message>Unfortunately there aren't any schools around you :(</Response></Message>";
  }
}

module.exports = toTwilioText;
