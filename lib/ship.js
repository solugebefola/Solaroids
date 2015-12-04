(function () {
  if(typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }

  Ship = Solaroids.Ship = function (obj) {
    this.COLOR = "#f0f0f0";
    this.RADIUS = 25;
    this.game = obj.game;
    this.angle = 0;
    this.img = this.game.sprites.ship;
    this.thrustImg = this.game.sprites.shipThrust;
    Solaroids.MovingObject.call(
      this,
      {
        pos: obj.pos,
        vel: [0,0],//Solaroids.Util.randomVec(Math.random() * 10),
        color: this.COLOR,
        radius: this.RADIUS
      }
    );
  };
  Solaroids.Util.inherits(Ship, Solaroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    var shipImage = this.img;
    ctx.save();
    ctx.translate(this.pos[0],this.pos[1]);
    ctx.rotate(this.angle);
    if (key.isPressed("up")){
      shipImage = this.thrustImg;
    }
    if (key.isPressed("space")){
      this.drawBeam(ctx);
    }
    ctx.drawImage(shipImage, -16, -16);
    ctx.restore();
  };

  Ship.prototype.drawBeam = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(0,-16);
    ctx.arc(
      0,
      -16,
      100,
      -(Math.PI/2) - Math.PI/8,
      -(Math.PI/2) + Math.PI/8,
      false
    );
    ctx.closePath();
    var gradient = ctx.createRadialGradient(0, -16, 100, 0, -16, 0);
    gradient.addColorStop(1,"#000000");
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  Ship.prototype.beam = function () {

  };

  Ship.prototype.turn = function (dir) {
    this.angle += 15 * dir * 2 * Math.PI / 360;
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    var speedLimit = 30;
    var xImpulse = impulse * Math.sin(this.angle);
    var yImpulse = -impulse * Math.cos(this.angle);
    var newVel = [this.vel[0] + xImpulse, this.vel[1] + yImpulse];
    var newSpeed = Solaroids.Util.speed(newVel);
    if (newSpeed > speedLimit){
    }else{
      this.vel = newVel;
    }
  };

})();
