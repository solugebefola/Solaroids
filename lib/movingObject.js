(function() {
  if (typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
  var MovingObject = Solaroids.MovingObject = function (object) {
    this.pos = object.pos;
    this.vel =  object.vel;
    this.radius = object.radius;
    this.color = object.color;
    this.hits = object.hits;
  };

  MovingObject.prototype.draw = function (ctx) {
    gradient = ctx.createRadialGradient(
      this.pos[0],
      this.pos[1],
      0,
      this.pos[0],
      this.pos[1],
      this.radius
    );
    gradient.addColorStop(0.25, this.color);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
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
    if (this.pos[0] < -this.radius ){
      this.pos[0] = width + this.radius;
    }else if (this.pos[0] > width + this.radius) {
      this.pos[0] = -this.radius;
    }
    if (this.pos[1] < -this.radius){
      this.pos[1] = height + this.radius;
    }else if (this.pos[1] > height + this.radius) {
      this.pos[1] = -this.radius;
    }
  };

  MovingObject.prototype.collideWith = function (object) {
    var combinedRadius = this.radius + object.radius;
    if (Solaroids.Util.distance(this.pos, object.pos) < combinedRadius){
      return true;
    }else{
      return false;
    }
  };

  MovingObject.prototype.transferVelocityTo = function (object, transferFactor) {
    object.vel[0] = object.vel[0] + this.vel[0] * transferFactor * this.radius / object.radius;
    object.vel[1] = object.vel[1] + this.vel[1] * transferFactor * this.radius / object.radius;
  };

})();
