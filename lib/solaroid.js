(function(){
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
    var Solaroid = Solaroids.Solaroid = function (obj) {
      this.colorShift = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
      this.COLOR = "#b0f";
      this.RADIUS = 10 * Math.random();
      this.angle = 0;


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
    this.color = "#"  + this.colorShift[Math.floor(this.radius * Math.sin(this.radius)) + 1] + this.colorShift[Math.floor(this.radius * Math.cos(this.radius))] + "3";
    Solaroids.MovingObject.prototype.move.call(this);
  };
})();
