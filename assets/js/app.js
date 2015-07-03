Class('App').inherits(Widget)({

  ELEMENT_CLASS:'app',

  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);

      this.camera = new Webcam();
      this.camera.render(this.element);

      this.mirror = new Mirror();

      this._bindEvents();
    },

    _bindEvents : function _bindEvents(){
      window.pixiApp.bind('setup', this._setup.bind(this));
      window.pixiApp.bind('update', this._update.bind(this));
    },

    _setup : function _setup(ev){
      var data = ev.data;

      // var graphics = new PIXI.Graphics();
      // graphics.lineStyle (2 , 0xffffff, 1);
      // graphics.beginFill(0x0000ff);
      // graphics.drawCircle(0,0, 100);

      // this.videoFrame = new PIXI.Sprite();

      data.stage.addChild(this.mirror.container);
    },

    _update : function _update(ev){
      var data = ev.data;

      this.mirror.update(this.camera.getFrame());

    }

  }
});