(function() {
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }

  var Game = Solaroids.Game =  function (DIM_X, DIM_Y, NUM_SOLAROIDS) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_SOLAROIDS = 10;
    this.solaroids = [];
  };
  
  Game.prototype.randomPosition = function () {
    var xCoord = Math.random() * this.DIM_X;
    var yCoord = Math.random() * this.DIM_Y;
    return [xCoord, yCoord];
  };

  Game.prototype.addSolaroids = function () {
    for (var i; i < this.NUM_SOLAROIDS; i++){
      this.solaroids.push(new Solaroid({ pos: this.randomPosition() }));
    }
  };

  Game.protoype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.solaroids.forEach(function(solaroid) {
      solaroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.solaroids.forEach(function(solaroid){
      solaroid.move();
    });
  };

})();
