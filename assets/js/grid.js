Class('Grid').inherits(Widget)({
  prototype : {

    cellSize: {
      w : 32,
      h : 32
    },

    init : function(config){
      Widget.prototype.init.call(this, config);
      this._bindEvents();
    },

    _bindEvents : function _bindEvents(){
      var timeOut;
      window.onresize = function(){
         clearTimeout(timeOut);
         timeOut = setTimeout(function(){
          this.refresh();
         }.bind(this), 400);
      }.bind(this);

    },

    refresh : function refresh(){
      this.viewPortSize = {
        w : window.innerWidth,
        h : window.innerHeight
      };

      pixiApp.resize(this.viewPortSize);

      var cellWidth = this.cellSize.w, //max image size
          tileColQty = Math.ceil(this.viewPortSize.w/cellWidth), //how many max fit + 1 (ceil)
          tileWidth = Math.ceil(this.viewPortSize.w/tileColQty), //get exact size for n cols
          tileScale = tileWidth/cellWidth, //get scale to resize image
          tileHeight = (tileScale*this.cellSize.h),//20 tile footer size
          tileRowQty = this.viewPortSize.h/tileHeight;

          gridPositions = []; //empty position table

      for(var row=0; row<tileRowQty; row++){
        for(var col=0; col<tileColQty; col++){
          gridPositions.push({x:col*tileWidth,y:row*tileHeight}); //calculate each tile position on the wall
        }
      }
      this.gridPositions = gridPositions;
      this.dispatch('changed', {data: {
        gridPositions : gridPositions,
        meta : {
          cellWidth : cellWidth,
          tileColQty : tileColQty,
          tileWidth : tileWidth,
          tileScale : tileScale,
          tileHeight : tileHeight,
          tileRowQty : tileRowQty
        }
      }});
    },

    getGridPositions : function getGridPositions(){
      return this.gridPositions;
    }

  }
});