(function(){
  if (typeof Solaroids === "undefined"){
    Solaroids = window.Solaroids = {};
  }
    var Solaroid = Solaroids.Solaroid = function (obj) {
      this.COLOR = "#b0f";
      this.RADIUS = 50;


      Solaroids.MovingObject.call(
        this,
        {
          pos: obj.pos,
          vel: Solaroids.Util.randomVec(Math.random() * 20),
          color: this.COLOR,
          radius: this.RADIUS
        }
      );
    };

  Solaroids.Util.inherits(Solaroid, MovingObject);
})();
