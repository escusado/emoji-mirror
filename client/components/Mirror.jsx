import React from 'react';
import * as PIXI from 'pixi.js';
const Chroma = require('chroma-js');

export default class Mirror extends React.Component {

  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    window.Mediator.on('camera-update', this.handleCameraUpdate.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));

    this.app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: false,
        transparent: false,
        resolution: 1
      });
    this.app.renderer.backgroundColor = 0xFF0000;
    this.canvasEl.appendChild(this.app.view);
    this.mirrorContainer = new PIXI.Container();
    this.app.stage.addChild(this.mirrorContainer);
  }

  handleResize () {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  handleCameraUpdate (e){
    const sourceRes = {
      width: e.data[e.data.length-1].x+1,
      height: e.data[e.data.length-1].y+1
    };

    const tileSize = Math.floor(window.innerWidth / sourceRes.width );
    this.mirrorContainer.destroy();
    this.mirrorContainer = new PIXI.Container();
    this.app.stage.addChild(this.mirrorContainer);
    e.data.map((pixel, index)=>{
      var graphics = new PIXI.Graphics();
      // let tileColor = Chroma(pixel.color.r, pixel.color.g, pixel.color.b).rgb();
      let tileColor = [pixel.color.r, pixel.color.g, pixel.color.g];
      // tileColor = (tileColor[0] + tileColor[1] + tileColor[2]) / (255 * 3);
      // tileColor = ((tileColor[0]*255 << 16) + (tileColor[1]*255 << 8) + tileColor[2]*255);

      let hexColor = PIXI.utils.rgb2hex(Chroma(tileColor).gl());
      // let rgbColor = PIXI.utils.hex2rgb(hexColor);
      let rgbColor = '#'+hexColor;
      // if(pixel.color.r){
      //   console.log('>>', tileColor);
      // }
      graphics.beginFill(hexColor);
      graphics.drawRect(pixel.x*tileSize, pixel.y*tileSize, tileSize, tileSize);

      if(index === 0){
        let text = new PIXI.Text(
          `
          r:${tileColor[0]},
          g:${tileColor[1]},
          b:${tileColor[2]}
          `,
          {
            fontFamily : 'Arial',
            fontSize: 8,
            fill : 0x000000,
            align : 'center'
          });
          text.position = {
            x : 0,
            y : 0
          };
          console.log('>> color for first', [pixel.color.r, pixel.color.g, pixel.color.g], parseInt(hexColor, 16), rgbColor);
          this.mirrorContainer.addChild(text);
      }

      this.mirrorContainer.addChild(graphics);
    });
  }

  // fromRGBto32(rgbArr) {
  //   const color = '0x' + rgbArr.reduce(function(s, v) {
  //     return s + ('0' + v.toString(16)).slice(-2);
  //   },'') + 'ff';
  //   return color;
  // }

  render() {
    return (
      <div  className="mirror" ref={(canvasEl) => { this.canvasEl = canvasEl; }}>

      </div>
    );
  }

}
