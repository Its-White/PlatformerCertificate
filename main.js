var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

// load an image to draw
//var chuckNorris = document.createElement("img");
//chuckNorris.src = "hero.png";

var keyboard = new Keyboard();
var player = new Player();
var enemy = new enemy();


var cells = [];

function pixelToTile(pixel)
{
	return Math.floor(pixel / TILE);
}

function tileToPixel(tile_coord)
{
	return tile_coord * TILE;
}

function cellAtTileCoord(layer, tx, ty)
{
	if (tx < 0 || tx > MAP.tw)
	{
		return 1;
	}
	if(ty >= MAP.th)
	{
		return 0;
	}
	return cells[layer][tx][ty];
}

function cellAtPixelCoord(layer, x, y)
{
	var tx = pixelToTile(x);
	var ty = pixelToTile(y);
	
	return cellAtTileCoord(layer, tx, ty);
}



function initializeCollision()
{
	//loop through each layer
	for(layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		cells[layerIdx] = [];
		var idx = 0;
		
		//loop through each row
		for(var y=0; y< stage1.layers[layerIdx].height; ++y)
		{
			cells[layerIdx][y] = [];
		
			//loop through each cell
			for(var x =0; x<stage1.layers[layerIdx].width; ++x)
			{
				if(stage1.layers[layerIdx].data[idx]!=0){
					cells[layerIdx][y][x] =1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][x][y]!=1)
				{
					cells[layerIdx][y][x] =0;
				}
				
				++idx;
			}
		}
	}
}

function run()
{
	
	context.fillStyle = "#7EC0EE";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	drawMap();
	var deltaTime = getDeltaTime();
	
	//context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);
	
	enemy.update(deltaTime);
	enemy.draw();
	
	player.update(deltaTime);
	player.draw();
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
	


	
	
}


//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
