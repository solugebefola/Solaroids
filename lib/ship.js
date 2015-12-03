(function () {
  if(typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }

  Ship = Solaroids.Ship = function (obj) {
    this.COLOR = "#f0f0f0";
    this.RADIUS = 25;
    this.type = "ship";
    this.game = obj.game;
    this.angle = 0;
    this.img = new Image();
    this.img.src = "lib/images/ship.png";
    Solaroids.MovingObject.call(
      this,
      {
        pos: obj.pos,
        vel: Solaroids.Util.randomVec(Math.random() * 10),
        color: this.COLOR,
        radius: this.RADIUS
      }
    );
  };
  Solaroids.Util.inherits(Ship, Solaroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
      ctx.drawImage(this.img, this.pos[0], this.pos[1]);
  };

  Ship.prototype.turn = function (dir) {
    this.angle += dir * 2 * Math.PI / 360;
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel += impulse;
  };

})();
