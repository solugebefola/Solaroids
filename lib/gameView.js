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
    this.bindKeyHandlers();
    setInterval(function () {
      this.game.draw(ctx);
      this.game.step();
    }.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    key("left", function(){
      this.game.ship.turn(-1);
      return false;
    }.bind(this));

    key("right", function() {
      this.game.ship.turn(1);
      return false;
    }.bind(this));

    key("up", function() {
      this.game.ship.power(1);
      return false;
    }.bind(this));

    key("b", function () {
      this.game.ship.power(5);
      return false;
    }.bind(this));

    key("space", function() {
      this.game.ship.beam();
      return false;
    }.bind(this));
  };
})();
