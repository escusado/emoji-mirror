Class('Mirror').inherits(Widget)({
  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);

      var graphics = new PIXI.Graphics();
      graphics.lineStyle (2 , 0xffffff, 1);
      graphics.beginFill(0x0000ff);
      graphics.drawCircle(0,0, 100);

      this.container = new PIXI.Container();

      this.container.addChild(graphics);
    },

    update : function update(bitmapData){


    }

  }
});