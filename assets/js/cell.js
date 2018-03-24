Class('Cell').inherits(Widget)({
  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);

      var graphics = new PIXI.Graphics();
      graphics.lineStyle (2 , 0xffffff, 1);
      graphics.beginFill(0x0000ff);
      graphics.drawRect(0,0, 100, 100);

      this.container = new PIXI.Container();
      this.container.addChild(graphics);
    },

    setSize : function setSize(size){
      this.container.width = size.w;
      this.container.height = size.h;
    },

    setPosition : function setPosition(position){
      this.container.x = position.x;
      this.container.y = position.y;
    },

    _destroy : function _destroy(){
      this.container.destroy();
    }
  }
});