(function () {
  if(typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }
  var HealthBar = Solaroids.HealthBar = function (ship) {
    this.ship = ship;
  };

  HealthBar.prototype.draw = function (ctx) {
    var colorSet = ["#f00", "#ff0", "#0f0"];
    var barWidth = 100;
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(20, 20, barWidth, 14);
    ctx.fillRect(20, 20, barWidth, 14);
    ctx.fillStyle = colorSet[Math.floor(this.ship.hits/34)];
    ctx.fillRect(25, 22, barWidth * this.ship.hits / 100 - 10, 10);
  };
})();
