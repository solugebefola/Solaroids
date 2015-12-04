(function() {
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }

  var Game = Solaroids.Game =  function (DIM_X, DIM_Y, NUM_SOLAROIDS) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_SOLAROIDS = NUM_SOLAROIDS;
    this.initImages();
    this.ship = new Solaroids.Ship({
      pos: [this.DIM_X / 2 ,this.DIM_Y / 2],//this.randomPosition(),
      game: this,
    });
    this.allObjects = [this.ship];
  };

  Game.prototype.initImages = function () {
    this.sprites = {
      ship: new Image(),
      shipThrust: new Image(),
      solaroid: new Image(),
    };
    this.sprites.ship.src = "lib/images/ship.png";
    this.sprites.shipThrust.src = "lib/images/ship_thrust.png";
    this.sprites.solaroid.src = "lib/images/asteroid1.png";
  };

  Game.prototype.randomPosition = function () {
    var xCoord = Math.random() * this.DIM_X;
    var yCoord = Math.random() * this.DIM_Y;
    return [xCoord, yCoord];
  };

  Game.prototype.addSolaroids = function () {
    for (var i=0; i < this.NUM_SOLAROIDS; i++){
      this.allObjects.push(new Solaroids.Solaroid({ pos: this.randomPosition() }));
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects.forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects.forEach(function(object){
      object.wrap(this.DIM_X, this.DIM_Y);
      object.move();
    }.bind(this));
  };

  Game.prototype.checkSolaroidCollisions = function () {
    for (var i = 0; i < this.allObjects.length + 1; i++) {
      for (var j = i + 1; j < this.allObjects.length; j++) {
        if (this.allObjects[i].collideWith(this.allObjects[j])) {
          if (this.allObjects[i] instanceof Solaroids.Ship){
            this.allObjects[i].relocate();
          }else{
            this.shrinkObject(j);
            this.shrinkObject(i);
          }
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkSolaroidCollisions();
  };

  Game.prototype.shrinkObject = function (arrayIndex) {
    this.allObjects[arrayIndex].radius /= 2;
  };

})();
