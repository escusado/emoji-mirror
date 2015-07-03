Class('Webcam').inherits(Widget)({
  ELEMENT_CLASS:'webcam',

  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);

      this.videoEl = document.createElement('video');
      this.canvasEl = document.createElement('canvas');

      this.element.appendChild(this.videoEl);
      this.element.appendChild(this.canvasEl);

      this.ctx = this.canvasEl.getContext('2d');

      // this.element.style.visibility = 'hidden';
      // this.element.style.position = 'absolute';

      this.setup();
    },

    setup : function setup(){

      navigator.webkitGetUserMedia({video: true, audio: false},

        function(stream) {
          this.videoEl.src = window.URL.createObjectURL(stream);
          this.videoEl.play();
        }.bind(this),

        function(err) {
          console.log("An error occured! " + err);
        }.bind(this)

      );

    },

    getFrame : function getFrame(){
      var streamSize = {
        w: this.videoEl.videoWidth || 1,
        h: this.videoEl.videoHeight || 1
      };

      this.canvasEl.width = streamSize.w;
      this.canvasEl.height = streamSize.h;

      this.ctx.drawImage(this.videoEl,0,0);
      return this.ctx.getImageData(0,0,streamSize.w,streamSize.h);
    }
  }
});