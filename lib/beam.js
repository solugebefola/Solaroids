(function () {
  if (typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }
  Beam = Solaroids.Beam = function (ship) {
    this.step = 30;
    this.color = "#000000";
    this.radius = 3;
    this.ship = ship;
    this.game = this.ship.game;
    this.angle = this.ship.angle + (Math.random() - 0.5) * Math.PI/8;
    this.type = "Beam";
    this.vel = [
      this.ship.vel[0] + 10 * Math.sin(this.angle),
      this.ship.vel[1] - 10 * Math.cos(this.angle)
    ];
    this.pos = [
      this.ship.pos[0] + 16 * Math.sin(this.ship.angle),
      this.ship.pos[1] - 16 * Math.cos(this.ship.angle)
    ];
  };
  Solaroids.Util.inherits(Beam, Solaroids.MovingObject);

  Beam.prototype.move = function () {
    this.step *= 0.90;
    this.radius = this.step / 10;
    Solaroids.MovingObject.prototype.move.call(this);
  };

})();
