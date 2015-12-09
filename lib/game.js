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
      asteroid_break1: new Image(),
      asteroid_break2: new Image(),
      background: new Image()
    };
    this.sprites.ship.src = "lib/images/ship.png";
    this.sprites.shipThrust.src = "lib/images/ship_thrust.png";
    this.sprites.asteroid.src = "lib/images/asteroid1.png";
    this.sprites.asteroid_break1.src = "lib/images/asteroid_fracture1.png";
    this.sprites.asteroid_break2.src = "lib/images/asteroid_fracture2.png";
    this.sprites.background.src = "lib/images/large_space.jpg";
  };

  Game.prototype.randomPosition = function () {
    var xCoord = Math.random() * this.DIM_X;
    var yCoord = Math.random() * this.DIM_Y;
    return [xCoord, yCoord];
  };

  Game.prototype.addOids = function (num, constructory) {
    for (var j=0; j < num; j++){
      this.allObjects.push(new constructory({ pos: this.randomPosition() }, this));
    }
  };

  Game.prototype.addAllObjects = function () {
    this.addOids(this.NUM_ASTEROIDS, Solaroids.Asteroid);
    this.addOids(this.NUM_SOLAROIDS, Solaroids.Solaroid);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.sprites.background, 0, 0);
    if (this.ship.hits < 1){
      ctx.fillStyle = "#ffffff";
      ctx.font ="italic 100px sans-serif ";
      ctx.fillText("Game Over", this.DIM_X / 3.25, this.DIM_Y / 2.5);
      ctx.font ="50px sans-serif ";
      ctx.fillText("Play again?", this.DIM_X / 2.5, this.DIM_Y / 2);
    }else{
      this.allObjects.forEach(function(object) {
        object.draw(ctx);
      });
    }

  };

  Game.prototype.move = function() {
    this.allObjects.forEach(function(object){
      object.wrap(this.DIM_X, this.DIM_Y);
      object.move();
    }.bind(this));
  };

  Game.prototype.removeTinyItems = function () {
    this.allObjects = this.allObjects.filter(function (obj) {
      return (obj.radius > 1 && obj.hits > 0);
    });
  };

  Game.prototype.checkCollisions = function () {
    this.removeTinyItems();
    for (var i = 0; i < this.allObjects.length - 1; i++) {
      for (var j = i + 1; j < this.allObjects.length; j++) {
        if (this.allObjects[i].collideWith(this.allObjects[j])) {
          switch ([this.allObjects[i].type, this.allObjects[j].type].join(",")){
            case ("Ship,Solaroid"):
            case ("Solaroid,Ship"):
              break;
            case ("Beam,Solaroid"):
            case ("Solaroid,Beam"):
              this.allObjects[i].radius *= 0.9;
              this.allObjects[j].radius *= 0.9;
              break;
            case ("Ship,Asteroid"):
              this.allObjects[i].hits -= 0.5;
              console.log(this.allObjects[i].hits);
              break;
            case ("Beam,Asteroid"):
              this.allObjects[j].hits -= 0.2;
              break;
          }
        }
      }
    }
  };

  Game.prototype.makeBeam = function () {
    this.allObjects.unshift(new Beam(this.ship));
  };

  Game.prototype.step = function () {
    this.move();
    if (key.isPressed("space")){
      this.makeBeam();
    }
    this.checkCollisions();
  };

  Game.prototype.shrinkObject = function (arrayIndex) {
    this.allObjects[arrayIndex].radius *=  0.5;
  };

})();
