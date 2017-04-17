var toTwilioText = function(list) {
  var baseMsg = "<Response><Message>EsportsEDU schools around you!: "
  baseMsg += list[0];
  for(var i = 1; i < list.length; i++) {
    baseMsg += ", " + list[i];
  }
  baseMsg += "!</Message></Response>";
  return baseMsg;
}

module.exports = toTwilioText;
