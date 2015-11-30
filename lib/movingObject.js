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
    };
  };
})(this);
