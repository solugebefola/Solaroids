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
    for (var i = 0; i < this.allObjects.length - 1; i++) {
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
    if (key.isPressed("space")){
      this.checkBeamRepulsion();
    }
    // this.checkSolaroidCollisions();
  };

  Game.prototype.checkBeamRepulsion = function () {
    var repulsionStrength = 5;
    for (var i = 1; i < this.allObjects.length; i++) {
      var xBeamOrigin =
        this.ship.pos[0] + 16 * Math.sin(this.ship.angle);
      var yBeamOrigin =
        this.ship.pos[1] - 16 * Math.cos(this.ship.angle);

      var xObj = this.allObjects[i].pos[0];
      var yObj = this.allObjects[i].pos[1];
      objectToBeamDistance = this.distance(
        this.allObjects[i].pos, [xBeamOrigin, yBeamOrigin]
      );
      objectToShipDistance = this.distance(
        this.allObjects[i].pos, this.ship.pos
      );
      var objAngle = Math.atan((xObj - xBeamOrigin) / (yObj - yBeamOrigin)) - this.ship.angle;
      if (
        objectToBeamDistance < 100 &&
        Math.abs(objAngle) < (Math.PI / 8) &&
        objectToBeamDistance < objectToShipDistance
      ) {

        this.allObjects[i].vel[0] += (
          repulsionStrength * Math.sin(this.ship.angle + objAngle)
        );
        this.allObjects[i].vel[1] += (
          repulsionStrength * -Math.cos(this.ship.angle + objAngle)
        );

      }
    }
  };

  Game.prototype.distance = function (pos1, pos2) {
    return (
      Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
      )
    );
  }

  Game.prototype.shrinkObject = function (arrayIndex) {
    this.allObjects[arrayIndex].radius /= 2;
    if (this.allObjects[arrayIndex].radius < 1){
      this.allObjects.splice(arrayIndex, 1);
    }
  };

})();
