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
      solaroid.move();
      solaroid.wrap(this.DIM_X, this.DIM_Y);
    }.bind(this));
  };

  Game.prototype.checkSolaroidCollisions = function () {
    for (var i = 0; i < this.solaroids.length + 1; i++) {
      for (var j = i + 1; j < this.solaroids.length; j++) {
        if (this.solaroids[i].collidedWith(this.solaroids[j])) {
          this.shrinkObject(i);
          this.shrinkObject(j);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkSolaroidCollisions();
  };

  Game.prototype.shrinkObject = function (arrayIndex) {
    this.solaroids[arrayIndex].radius /= 2;
  };

})();
