(function() {
  if(typeof(Solaroids) === "undefined") {
    Solaroids = window.Solaroids = {};
  }
  var GameView = Solaroids.GameView = function (Game, ctx){
    this.start = function () {
      setInterval(function () {
        Game.draw();
        Game.moveObjects();
        console.log("draw");
      }, 20);
    };
  };
})();
