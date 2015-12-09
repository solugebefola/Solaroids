(function(){
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
    var Asteroid = Solaroids.Asteroid = function (obj, game) {
      this.COLOR = "#b0f";
      this.RADIUS = 16 + 100 * Math.random();
      this.angle = 0;
      this.rotation = 0.005 * (Math.random() - 0.5);
      this.game = game;
      this.img = this.game.sprites.asteroid;
      this.type = "Asteroid";
      this.hits = this.RADIUS;


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
    if (this.hits/this.radius > 0.75) {
    }else
    if (this.hits/this.radius > 0.35) {
      this.img = this.game.sprites.asteroid_break1;
    }else {
      this.img = this.game.sprites.asteroid_break2;
    }
    if (this.hits <= 0) {
      this.radius = 0;
    }
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
