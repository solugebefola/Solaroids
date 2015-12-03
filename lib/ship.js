(function () {
  if(typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }

  Ship = Solaroids.Ship = function (obj, game) {
    this.COLOR = "#f0f0f0";
    this.RADIUS = 25;
    this.type = "ship";
    this.angle = 0;
    this.game = game;
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

  Ship.prototype.draw = function (ctx, image) {
    ctx.drawImage(image, this.pos[0], this.pos[1]);
  };

  Ship.prototype.turn = function (dir) {
    this.angle += dir * 2 * Math.PI / 360;
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };
})();
