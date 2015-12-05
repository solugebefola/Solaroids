(function(){
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
    var Asteroid = Solaroids.Asteroid = function (obj, game) {
      this.COLOR = "#b0f";
      this.RADIUS = 16 + 100 * Math.random();
      this.angle = 0;
      this.rotation = 0.05 * (Math.random() - 0.5);
      this.game = game;
      this.img = this.game.sprites.asteroid;
      this.type = "Asteroid";


      Solaroids.MovingObject.call(
        this,
        {
          pos: obj.pos,
          vel: Solaroids.Util.randomVec(Math.random() * 1),
          color: this.COLOR,
          radius: this.RADIUS
        }
      );
    };

  Solaroids.Util.inherits(Asteroid, Solaroids.MovingObject);

  Asteroid.prototype.move = function () {
    this.angle += this.rotation ;
    Solaroids.MovingObject.prototype.move.call(this);
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.img,
      -this.radius,
      -this.radius,
      2 * this.radius,
      2 * this.radius
    );
    ctx.restore();
  };
})();
