Class('ImageMap').inherits(Widget)({
  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);

    },

    getSetByColor : function getSetByColor(){
      return {
        '#FF0000' : (new PIXI.Graphics()).beginFill(0xFF0000).drawCircle(0,0, 100),
        '#00FF00' : (new PIXI.Graphics()).beginFill(0x00FF00).drawCircle(0,0, 100),
        '#0000FF' : (new PIXI.Graphics()).beginFill(0x0000FF).drawCircle(0,0, 100)
      };
    }
  }
});