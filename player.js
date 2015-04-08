var Player = function() {
	this.image = document.createElement("img");
	this.position = new vector2(canvas.width/2, canvas.height/2);
	//this.position.set()
	
	this.width = 95;
	this.height = 128;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;
	this.velocity = new vector2(0, 0);
	
	this.x = 0;
	this.y = 0;
	
	this.image.src = "hero.png";
};

//var playerIsDrawn = true;

Player.prototype.update = function(deltaTime)
{
	var acceleration = new vector2(0, 0);
	var playerAccel = 10000;
	var playerDrag = 8;
	var playerGravity = TILE * 9.8 * 13;
	acceleration.y = playerGravity;
	
	if(keyboard.isKeyDown(keyboard.KEY_LEFT))
	{
		acceleration.x -= playerAccel;
		this.image.src = "hero2.png"
	}
	if(keyboard.isKeyDown(keyboard.KEY_RIGHT))
	{
		acceleration.x += playerAccel;
		this.image.src = "hero.png"
	}
	if(keyboard.isKeyDown(keyboard.KEY_UP))
	{
		acceleration.y -= playerAccel;
	}
	if(keyboard.isKeyDown(keyboard.KEY_DOWN))
	{
		acceleration.y += playerAccel;
	}
	
	//var dragVector = this.multiplyScalar(playerDrag);
	
	acceleration = acceleration.subtract(this.velocity.multiplyScalar(playerDrag));
	//acceleration.multiplyScalar(deltaTime);
	this.velocity = this.velocity.add(acceleration.multiplyScalar(deltaTime));
	
	this.position = this.position.add(this.velocity.multiplyScalar(deltaTime))
	
	var tx = pixelToTile(this.position.y);
	var ty = pixelToTile(this.position.x);
	
	var nx = this.position.x % TILE;
	var ny = this.position.y % TILE;
	
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cell_right = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty);
	var cell_down = cellAtTileCoord(LAYER_PLATFORMS, tx, ty+1);
	var cell_diag = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty+1);
	
	if(this.velocity.y > 0)
	{
		if((cell_down && !cell) || (cell_diag && !cell_right && nx))
		{
			this.position.y = tileToPixel(ty);
			this.position.y = 0;
			ny = 0;
		}
	}
	else if (this.velocity.y < 0)
	{
		if((cell && !cell_down) || (cell_right && !cell_diag && nx))
		{
			this.position.y = tileToPixel(ty +1);
			this.velocity.y = 0;
			
			cell = cell_down;
			cell_right = cell_diag;
			cell_down = cellAtTileCoord(tx, ty+2);
			cell_down = cellAtTileCoord(tx+1, ty+2);
			ny = 0;
		}
	}
	
	if(this.velocity.x > 0)
	{
		if((cell_right && !cell) || (cell_diag && !cell_down && ny))
		{
			this.position.x = tileToPixel(tx);
			this.position.x = 0;
			ny = 0;
		}
		else if (this.velocity.x < 0)
		{
			if((cell && !cell_right) || (cell_down && !cell_diag && ny))
			{
				this.position.x = tileToPixel(tx +1);
				this.velocity.x = 0;
				
			}
		}
	}
	
	
	
	
};

Player.prototype.draw = function(){
	context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
};
