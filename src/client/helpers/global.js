String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  for (var i = 0; i < find.length; i++) {   
    replaceString = replaceString.replace(find[i], replace[i]);
  }  
  return replaceString;
};
