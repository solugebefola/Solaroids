(function() {
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
  var MovingObject = Solaroids.MovingObject = function (object) {
    this.pos = object.pos;
    this.vel =  object.vel;
    this.radius = object.radius;
    this.color = object.color;

    this.draw =  function (ctx) {
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
      );

      ctx.fill();
    };
  };
})(this);
