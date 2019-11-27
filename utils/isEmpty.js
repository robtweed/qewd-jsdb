module.exports = function(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
};
