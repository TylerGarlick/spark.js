System.register([], function($__export) {
  "use strict";
  var Spark;
  return {
    setters: [],
    execute: function() {
      Spark = $__export("Spark", (function() {
        var Spark = function Spark() {};
        return ($traceurRuntime.createClass)(Spark, {say: function() {
            var message = arguments[0] !== (void 0) ? arguments[0] : '';
            console.log(message);
          }}, {});
      }()));
    }
  };
});
