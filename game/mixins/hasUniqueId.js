hasUniqueId = function() {
  var makeUUID = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  };
  
  var uuid = makeUUID() + '_' + makeUUID() + '_' + makeUUID();
  
  return {
    uuid: uuid
  };
};

module.exports = hasUniqueId;
