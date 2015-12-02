(function() {
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }

  var Game = Solaroids.Game = {
    DIM_X: 800,
    DIM_Y: 800,
    NUM_SOLAROIDS: 10,

    randomPosition: function () {
      var xCoord = Math.random() * this.DIM_X;
      var yCoord = Math.random() * this.DIM_Y;
      return [xCoord, yCoord];
    },

    addSolaroids: function () {
      var solaroids = [];
      for (var i; i < NUM_SOLAROIDS; i++){
        solaroids.push(new Solaroid({ pos: this.randomPosition() }));
      }
      return solaroids;
    },

    draw: function (ctx) {
      ctx.clearRect(0, 0, DIM_X, DIM_Y);
      addSolaroids.forEach(function(solaroid) {
        solaroid.draw(ctx);
      });
    }
  };

})();
