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
    this.beams = [];
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


  Game.prototype.handleBeams = function () {
    this.beams.filter(function(beam) {
      return beam.step > 0;
    });
  };

  Game.prototype.addAllObjects = function () {
    this.addSolaroids();
    this.allObjects = this.allObjects.concat(this.beams);
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

  Game.prototype.removeTinyItems = function () {
    this.allObjects = this.allObjects.filter(function (obj) {
      return obj.radius > 1;
    });
  };

  Game.prototype.checkCollisions = function () {
    this.removeTinyItems();
    for (var i = 0; i < this.allObjects.length - 1; i++) {
      for (var j = i + 1; j < this.allObjects.length; j++) {
        if (this.allObjects[i].collideWith(this.allObjects[j])) {
          var twoObj = [this.allObjects[i], this.allObjects[j]];
          if (twoObj[0] instanceof Ship && twoObj[1] instanceof Solaroids.Solaroid){
            this.allObjects[i].relocate();
          }else if(twoObj[0] instanceof Solaroids.Solaroid && twoObj[1] instanceof Solaroids.Solaroid){
            this.shrinkObject(j);
            this.shrinkObject(i);
          }else if(twoObj[1] instanceof Solaroids.Beam && !(twoObj[0] instanceof Solaroids.Beam)){
            console.log("beam collision");
            this.allObjects[i].radius *= 0.5;
            this.allObjects[i].radius *= 0.5;
          }
        }
      }
    }
  };

  Game.prototype.makeBeam = function () {
    this.beams.push(new Beam(this.ship));
    this.allObjects = this.allObjects.concat(this.beams);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    if (key.isPressed("space")){
      this.makeBeam();
    }
    this.checkCollisions();
  };

  Game.prototype.distance = function (pos1, pos2) {
    return (
      Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
      )
    );
  };

  Game.prototype.shrinkObject = function (arrayIndex) {
    this.allObjects[arrayIndex].radius *=  0.5;
    if (this.allObjects[arrayIndex].radius < 1){
      this.allObjects.splice(arrayIndex, 1);
    }
  };

})();
