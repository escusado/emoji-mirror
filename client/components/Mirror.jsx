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
      let tileColor = [pixel.color.r, pixel.color.g, pixel.color.g];
      let hexColor = PIXI.utils.rgb2hex(Chroma(tileColor).gl());
      let rgbColor = '#'+hexColor;
      graphics.beginFill(hexColor);
      graphics.drawRect(pixel.x*tileSize, pixel.y*tileSize, tileSize, tileSize);
      this.mirrorContainer.addChild(graphics);
    });
  }
  render() {
    return (
      <div  className="mirror" ref={(canvasEl) => { this.canvasEl = canvasEl; }}>

      </div>
    );
  }

}
