Class('PixiApp').inherits(Widget)({

  ELEMENT_CLASS: 'pixi-stage-container',

  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);

      this.size = {
        w : window.innerWidth,
        h : window.innerHeight
      };

      this.renderer = PIXI.autoDetectRenderer(this.size.w, this.size.h, config);
      this.element.appendChild(this.renderer.view);

      this.stage = new PIXI.Container();
    },

    setup : function setup(){
      this.dispatch('setup',{
        data : {
          stage : this.stage,
          size : this.size
        }
      });
    },

    animate : function animate(){
      var now = new Date().getTime(),
          updateData = {
              now: now,
              dt: now - (this.time || now)
          };

      this.time = now;

      this.dispatch('update', {
        data: updateData
      });

      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.stage);
    }

  }
});