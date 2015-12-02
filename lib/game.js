(function() {
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }

  var Game = Solaroids.Game =  function (DIM_X, DIM_Y, NUM_SOLAROIDS) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_SOLAROIDS = NUM_SOLAROIDS;
    this.solaroids = [];
  };

  Game.prototype.randomPosition = function () {
    var xCoord = Math.random() * this.DIM_X;
    var yCoord = Math.random() * this.DIM_Y;
    return [xCoord, yCoord];
  };

  Game.prototype.addSolaroids = function () {
    for (var i=0; i < this.NUM_SOLAROIDS; i++){
      this.solaroids.push(new Solaroids.Solaroid({ pos: this.randomPosition() }));
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.solaroids.forEach(function(solaroid) {
      solaroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.solaroids.forEach(function(solaroid){
      solaroid.wrap(this.DIM_X, this.DIM_Y);
      solaroid.move();
    }.bind(this));
  };

})();
