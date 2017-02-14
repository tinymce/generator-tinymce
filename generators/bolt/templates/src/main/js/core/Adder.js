define('tinymce.plugins.<%= camelName %>.core.Adder', [
], function () {
  var addTwo = function (num) {
    return num + 2;
  };

  return {
    addTwo: addTwo
  };
});
