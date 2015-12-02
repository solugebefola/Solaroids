(function() {
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }

  var Game = Solaroids.Game =  function () {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_SOLAROIDS = 10;
    this.solaroids = [];

    this.randomPosition = function () {
      var xCoord = Math.random() * this.DIM_X;
      var yCoord = Math.random() * this.DIM_Y;
      return [xCoord, yCoord];
    };

    this.addSolaroids = function () {
      for (var i; i < NUM_SOLAROIDS; i++){
        this.solaroids.push(new Solaroid({ pos: this.randomPosition() }));
      }
    };

    this.draw = function (ctx) {
      ctx.clearRect(0, 0, DIM_X, DIM_Y);
      this.solaroids.forEach(function(solaroid) {
        solaroid.draw(ctx);
      });
    };

    this.moveObjects = function() {
      this.solaroids.forEach(function(solaroid){
        solaroid.move();
      });
    };
  };

})();
