import React from 'react';
import * as PIXI from 'pixi.js';
const Chroma = require('chroma-js');
const NearestColor = require('nearest-color');

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
    this.app.renderer.backgroundColor = 0xFFFFFF;
    this.canvasEl.appendChild(this.app.view);
    this.mirrorContainer = new PIXI.Container();
    this.app.stage.addChild(this.mirrorContainer);
    this.colorList = NearestColor.from(Object.keys(window.emojis));

    this.emojisLoaded = false;
    this.resources;
    let loader = new PIXI.loaders.Loader();
    Object.keys(window.emojis).forEach((color)=>{
      loader.add(color, '../emojis/' + window.emojis[color]);
    });
    loader.load((loader, resources) => {
        console.log('emojis loading complete');
        this.resources = resources;
        this.emojisLoaded = true;
    });

    // const logo = new PIXI.Sprite.fromImage('../../logo.png');
    // logo.x = 10;
    // logo.y = 10;
    // logo.scale = 0.2;
    // this.app.stage.addChild(logo);

    this.colorScale = Chroma.scale(['#FF0014','#FF6813', '#FBF992', '#5CCA40', '#0091D2', '#A800E6', '#FF0014']).mode('lch').colors(256)
    this.colorScale = Chroma.scale(["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#0000ff", "#ff0000"]).mode('lch').colors(256)
    this.currentTintColor = this.colorScale[0];
    this.currentTintIndex = 0;
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
      let tile;
      if(this.emojisLoaded){
        tile = this.getEmoji(pixel, tileSize, this.colorScale[this.currentTintIndex]);
      }else{
        tile = this.getTile(pixel, tileSize);
      }
      this.mirrorContainer.addChild(tile);
    });

    if(this.currentTintIndex == this.colorScale.length){
      this.currentTintIndex = 0;
    }else{
      this.currentTintIndex++;
    }
  }

  getTile(pixel, tileSize){
    let tileColor = [pixel.color.r, pixel.color.g, pixel.color.g];
    let hexColor = PIXI.utils.rgb2hex(Chroma(tileColor).gl());
    let rgbColor = '#'+hexColor;
    var graphics = new PIXI.Graphics();
    graphics.beginFill(hexColor);
    graphics.drawRect(pixel.x*tileSize, pixel.y*tileSize, tileSize, tileSize);
    return graphics;
  }

  getEmoji(pixel, tileSize, tintColor){
    let tileColor = [pixel.color.r, pixel.color.g, pixel.color.g];
    tileColor = Chroma(tileColor).hex();
    if(tintColor){
      tileColor = Chroma.blend(tileColor, tintColor, 'darken').hex();
    }
    let closerColor = this.colorList(tileColor);
    const sprite = new PIXI.Sprite(this.resources[closerColor].texture);
    sprite.x = pixel.x*tileSize;
    sprite.y = pixel.y*tileSize;
    sprite.width = tileSize;
    sprite.height = tileSize;

    var graphics = new PIXI.Graphics();
    let hexColor = PIXI.utils.rgb2hex(Chroma(tileColor).gl());
    graphics.beginFill(hexColor);
    graphics.alpha = 0.5;
    graphics.drawRect(pixel.x*tileSize, pixel.y*tileSize, tileSize, tileSize);

    const group = new PIXI.Container();
    group.addChild(graphics);
    group.addChild(sprite);

    return group;
  }

  render() {
    return (
      <div  className="mirror" ref={(canvasEl) => { this.canvasEl = canvasEl; }}>

      </div>
    );
  }

}
