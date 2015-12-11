(function () {
  if (typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }

  var GameView = Solaroids.GameView = function (game, ctx){
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.game.addAllObjects();
    this.bindKeyHandlers();
    setInterval(function () {
      if (this.game.imagesLoaded) {
        this.game.draw(this.ctx);
        this.game.step();
      }
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
  };
})();
