(function () {
  if (typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }

  var GameView = Solaroids.GameView = function (game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.game.addSolaroids();
    setInterval(function () {
      this.game.draw(ctx);
      this.game.step();
    }.bind(this), 20);
  };
})();
