import React from 'react';

export default class Camera extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.videoEl.src = window.URL.createObjectURL(stream);
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

        // result.push({
        //   x: x,
        //   y: y,
        //   r: data[4 * (y * width + x)],
        //   g: data[4 * (y * width + x) + 1],
        //   b: data[4 * (y * width + x) + 2],
        //   a: data[4 * (y * width + x) + 3]
        // })
      }
    }
    return result;
  }

  updateFrame () {
    this.backCanvas.getContext('2d').drawImage(this.videoEl, 0, 0, 64, 48);
    var apx = this.backCanvas.getContext('2d').getImageData(0, 0, 64, 48);
    const arrayData = this.canvasDataToArray(apx.data, 64, 48);
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
        <canvas id="backCanvas" width="64" height="48" ref={(backCanvas) => { this.backCanvas = backCanvas; }}></canvas>
        <video id="video" width="64" height="48" ref={(videoEl) => { this.videoEl = videoEl; }}></video>
      </div>
    );
  }

}
