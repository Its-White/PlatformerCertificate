var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var LAYER_COUNT = 5;
var MAP = {tw:60,th: 15};

var TILE = 35;
var TILESET_TILE = 70;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var LAYER_BACKGROUND =0;
var LAYER_PLATFORMS =1;
var LAYER_LADDERS =2;
var LAYER_WATER = 3;
var LAYER_DOORS = 4;



var tileset = document.createElement("img");
tileset.src = "tileset.png";

function drawMap()
{
	for(var layerIdx=0; layerIdx<LAYER_COUNT;layerIdx++)
	{
		var idx = 0;
		for(var y = 0; y<stage1.layers[layerIdx].height; ++y)
		{
			for(var x = 0; x<stage1.layers[layerIdx].width; ++x)
			{
				if(stage1.layers[layerIdx].data[idx]!=0)
				{
					var tileIndex = stage1.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X)*(TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex/TILESET_COUNT_Y))*(TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset,sx,sy,TILESET_TILE,TILESET_TILE,x*TILE,(y-1)*TILE,TILESET_TILE,TILESET_TILE);
				}
				idx++;
			}
		}
	}
}
