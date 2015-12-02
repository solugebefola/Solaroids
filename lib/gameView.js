(function () {
  if (typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }

  var GameView = Solaroids.GameView = function (game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.addSolaroids();
      this.game.draw(ctx);
      this.game.moveObjects();
    }.bind(this), 20);
  };
})();
