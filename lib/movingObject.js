(function() {
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
  var MovingObject = Solaroids.MovingObject = function (object) {
    this.pos = object.pos;
    this.vel =  object.vel;
    this.radius = object.radius;
    this.color = object.color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
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

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.wrap = function (width, height) {
    this.pos[0] = (this.pos[0] + width) % width;
    this.pos[1] = (this.pos[1] + height) % height;
  };

  MovingObject.prototype.collideWith = function (object) {
    var xDistance = Math.abs(this.pos[0] - object.pos[0]);
    var yDistance = Math.abs(this.pos[1] - object.pos[1]);
    var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    var combinedRadius = this.radius + object.radius;
    if (distance < combinedRadius){
      return true;
    }else{
      return false;
    }
  };

})();
