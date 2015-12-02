(function(){
  if(typeof(Solaroids) === "undefined"){
    Solaroids = window.Solaroids = {};
  }
  var Util = Solaroids.Util = {

    inherits: function (ChildClass, ParentClass) {
      var args = Array.prototype.slice.call(arguments);
      var Surrogate = function (){};
      Surrogate.prototype = ParentClass.prototype;
      ChildClass.prototype = new Surrogate();
      ChildClass.prototype.constructor = ChildClass;
    },

    randomVec: function (length){
      var angle = Math.random() * 2 * Math.PI;
      var xCoord = length * Math.cos(angle);
      var yCoord = length * Math.sin(angle);
      return [xCoord, yCoord];
    }

  };
})();
