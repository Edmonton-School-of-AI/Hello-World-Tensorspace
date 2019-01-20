$(function() {
  const modelContainer = document.getElementById("container");
  const model = new TSP.models.Sequential(modelContainer);

  model.add( new TSP.layers.GreyscaleInput({ shape: [28, 28, 1] }) );
  model.add( new TSP.layers.Padding2d({ padding: [2, 2] }) );
  model.add( new TSP.layers.Conv2d({ kernelSize: 5, filters: 6, strides: 1 }) );
  model.add( new TSP.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }) );
  model.add( new TSP.layers.Conv2d({ kernelSize: 5, filters: 16, strides: 1 }) );
  model.add( new TSP.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }) );
  model.add( new TSP.layers.Dense({ units: 120 }) );
  model.add( new TSP.layers.Dense({ units: 84 }) );
  model.add( new TSP.layers.Output1d({
    units: 10, 
    outputs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  }) );

  model.load({
    type: "tfjs",
    url: "./model/mnist.json",
    onComplete: function() {
      console.log("mnist model loaded");
    }
  });

  model.init(function() {
    $.ajax({
      url: "./data/5.json",
      type: "GET",
      async: true,
      dataType: "json",
      success: function(data) {
        model.predict(data);
      }
    });
  });
});