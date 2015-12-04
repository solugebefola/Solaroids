(function () {
  if (typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }
  Beam = Solaroids.Beam = function (ship) {
    this.step = 50;
    this.COLOR = `rgba(${this.step}, ${this.step}, ${this.step}, ${this.step})`;
    this.RADIUS = 3;
    this.game = ship.game;
    this.angle = ship.angle + (Math.Random() - 0.5) * Math.PI/8;
    this.vel = [
      ship.vel[0] * 2 * Math.sin(this.angle),
      ship.vel[1] * 2 * Math.cos(this.angle)
    ];
    this.pos = [
      this.ship.pos[0] + 16 * Math.sin(this.ship.angle),
      this.ship.pos[1] - 16 * Math.cos(this.ship.angle)
    ];
  };

  Beam.protoype.draw = function (ctx) {
      this.parent.draw.call(this, ctx);
      this.step -= 1;
  };
})();
