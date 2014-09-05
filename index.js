var System = require('systemjs');
System.import('./dist/spark')
  .then(function (m) {
    var Spark = m.Spark;
    var spark = new Spark();
    spark.say('hello');
  });