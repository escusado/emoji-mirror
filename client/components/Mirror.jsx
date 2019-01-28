import React from 'react';
import * as PIXI from 'pixi.js';
const Chroma = require('chroma-js');
const NearestColor = require('nearest-color');

export default class Mirror extends React.Component {

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
    this.colorList = NearestColor.from(Object.keys(window.Emojis));

    this.resources = {};
    this.emojisLoaded = false;
    let loader = new PIXI.loaders.Loader();
    Object.keys(window.Emojis).forEach( (color) => {
      loader.add(color, '../emojis/' + window.Emojis[color]);
    });
    loader.load();
    loader.on('load', (loader, resource)=>{
      this.resources[resource.name] = resource;
    });

    // this.colorScale = Chroma.scale(['#FF0014','#FF6813', '#FBF992', '#5CCA40', '#0091D2', '#A800E6', '#FF0014']).mode('lch').colors(256)
    // this.colorScale = Chroma.scale(["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#0000ff", "#ff0000"]).mode('lch').colors(256);
    this.colorScale = Chroma.scale(["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "FF0000", "9400D3"]).mode('lch').colors(256);
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

    const tileSize = Math.ceil(window.innerWidth / sourceRes.width );
    this.mirrorContainer.destroy();
    this.mirrorContainer = new PIXI.Container();
    this.app.stage.addChild(this.mirrorContainer);

    e.data.map( (pixel, index) => {
      let tile = this.getEmoji(pixel, tileSize, this.colorScale[this.currentTintIndex]);
      this.mirrorContainer.addChild(tile);
    });

    if(this.currentTintIndex == this.colorScale.length-1){
      this.currentTintIndex = 0;
    }else{
      this.currentTintIndex++;
    }
  }

  getEmoji(pixel, tileSize, tintColor){

    let tileColor = [pixel.color.r, pixel.color.g, pixel.color.g];
    tileColor = Chroma(tileColor).hex();
    if(tintColor){
      tileColor = Chroma.blend(tileColor, tintColor, 'darken').hex();
    }
    let closerColor = this.colorList(tileColor);

    var graphics = new PIXI.Graphics();
    let hexColor = PIXI.utils.rgb2hex(Chroma(tileColor).gl());
    graphics.beginFill(hexColor);
    graphics.drawRect(pixel.x*tileSize, pixel.y*tileSize, tileSize, tileSize);

    const group = new PIXI.Container();
    group.addChild(graphics);

    if(this.resources[closerColor]){
      const sprite = new PIXI.Sprite(this.resources[closerColor].texture);
      sprite.x = pixel.x*tileSize;
      sprite.y = pixel.y*tileSize;
      sprite.width = tileSize;
      sprite.height = tileSize;

      group.addChild(sprite);
      graphics.alpha = 0.5;
    }

    return group;
  }

  render() {

    return (<div  className="mirror" ref={(canvasEl) => { this.canvasEl = canvasEl; }}></div>);
  }

}
