(function() {
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }

  var Game = Solaroids.Game =  function (
    DIM_X,
    DIM_Y,
    NUM_SOLAROIDS,
    NUM_ASTEROIDS
  ) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_SOLAROIDS = NUM_SOLAROIDS;
    this.NUM_ASTEROIDS = NUM_ASTEROIDS;
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
      asteroid: new Image(),
    };
    this.sprites.ship.src = "lib/images/ship.png";
    this.sprites.shipThrust.src = "lib/images/ship_thrust.png";
    this.sprites.asteroid.src = "lib/images/asteroid1.png";
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
    for (var j=0; j < this.NUM_ASTEROIDS; j++){
      this.allObjects.push(new Solaroids.Asteroid({ pos: this.randomPosition() }, this));
    }
  };


  Game.prototype.handleBeams = function () {
    this.beams.filter(function(beam) {
      return beam.step > 0;
    });
  };

  Game.prototype.addAllObjects = function () {
    this.addSolaroids();
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
          switch ([this.allObjects[i].type, this.allObjects[j].type]){
            case (["Ship", "Solaroid"]):
            case (["Solaroid", "Ship"]):
              break;
            case (["Solaroid","Solaroid"]):
              break;
            case (["Beam", "Solaroid"]):
            case (["Solaroid", "Beam"]):
              this.allObjects[i].radius *= 0.9;
              this.allObjects[i].radius *= 0.9;
              break;
            case ["Ship", "Asteroid"]:
            case ["Asteroid","Ship"]:
              console.log("Boom!");
              break;
          }
        }
      }
    }
  };
  //Add note: fix beam handling in all objects and beam array
  Game.prototype.makeBeam = function () {
    this.beams.push(new Beam(this.ship));
    this.allObjects = this.beams.concat(this.allObjects);
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
