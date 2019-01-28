import React from 'react';
const Config = require('../../config.json');

export default class Camera extends React.Component {

  componentDidMount(){

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {

        try {
          this.videoEl.srcObject = stream;
        } catch (error) {
          this.videoEl.src = window.URL.createObjectURL(stream);
        }
        
        this.videoEl.play();
      });
    }
    window.requestAnimationFrame(this.updateFrame.bind(this));
  }

  canvasDataToArray(data, width, height) {

    const result = []
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        let index = (x + y * width) * 4;
        let r = data[index];
        let g = data[index + 1];
        let b = data[index + 2];
        let a = data[index + 3];
        result.push({x,y,r,g,b,a});
      }
    }
    return result;
  }

  updateFrame () {

    this.backCanvasEl.getContext('2d').drawImage(this.videoEl, 0, 0, Config.width, Config.height);
    var apx = this.backCanvasEl.getContext('2d').getImageData(0, 0, Config.width, Config.height);
    const arrayData = this.canvasDataToArray(apx.data, Config.width, Config.height);
    const data = arrayData.map(el => {
      return {
        x: el.x,
        y: el.y,
        color : {
          r: el.r,
          g: el.g,
          b: el.b
        }
      };
    });
    window.Mediator.emit('camera-update', {data});
    window.requestAnimationFrame(this.updateFrame.bind(this));
  }

  render() {

    return (
      <div  className="camera">
        <canvas id="backCanvasEl" width={Config.width} height={Config.height} ref={(backCanvasEl) => { this.backCanvasEl = backCanvasEl; }}></canvas>
        <video id="video" width={Config.width} height={Config.height} ref={(videoEl) => { this.videoEl = videoEl; }}></video>
      </div>
    );
  }

}
