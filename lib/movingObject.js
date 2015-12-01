(function() {
  if (typeof(Asteroids) === "undefined"){
  Asteroids = window.Asteroids = {};
  }
  var MovingObject = Asteroids.MovingObject = function (object) {
    this.pos = object.pos;
    this.vel =  object.vel;
    this.radius = object.radius;
    this.color = object.color;

    this.draw =  function (ctx) {
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI);
    };
  };
})(this);
