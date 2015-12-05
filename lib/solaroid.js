(function(){
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
    var Solaroid = Solaroids.Solaroid = function (obj) {
      this.COLOR = "#000";
      this.RADIUS = 40 * Math.random();
      this.angle = 0;
      this.type = "Solaroid";


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

  Solaroids.Util.inherits(Solaroid, Solaroids.MovingObject);

  Solaroid.prototype.move = function () {
    this.radius += 0.03;
    this.color = "rgb("+parseInt(this.radius)+","+parseInt(this.radius*10)+","+parseInt(this.radius*3)+")";
    Solaroids.MovingObject.prototype.move.call(this);
  };
})();
