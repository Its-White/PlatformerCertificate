var enemy = function()
{
	this.image = document.createElement("img");
	this.image.src = "enemy.png";
	
	this.width = 200;
	this.height = 200;

	this.position = new Vector2();
	this.velocity = new Vector2();
	this.position.x = 50;
	this.position.y = 600;
	this.direction = RIGHT;
};

enemy.prototype.update = function(deltaTime)
{
	var acceleration = new Vector2();
	var enemyAccel = 4000;
	var enemyDrag = 12;
	
	if(this.direction == RIGHT)
	{
		acceleration.x = enemyAccel;
	}
	else if (this.direction == LEFT)
	{
		acceleration.x = -enemyAccel;
	}
	
	var dragX = this.velocity.x * enemyDrag;
	acceleration.x -= dragX;
	
	this.velocity = this.velocity.add(acceleration.multiplyScalar(deltaTime));
	this.position = this.position.add(this.velocity.multiplyScalar(deltaTime));
	
	var collisionOffset = new Vector2();
	collisionOffset.set(-8, this.height/2 - TILE);
	
	var collision_pos = this.position.add(collisionOffset);
	
	var tx = pixelToTile(collision_pos.x);
	var ty = pixelToTile(collision_pos.y);
		
	var nx = this.position.x % TILE;
	var ny = this.position.y % TILE;
	
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cell_right = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty);
	var cell_down = cellAtTileCoord(LAYER_PLATFORMS, tx, ty+1);
	var cell_diag = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty+1);
	//walk along a platform
	
	//if the enemy runs into a wall he'll turn around, or is about to fall off a platform.
	if (this.direction == RIGHT)
	{
		if (!cell &&(cell_right && nx))
		{
			this.direction = LEFT;
		}
		if(cell_down && !cell_diag && nx)
		{
			this.direction = LEFT;
		}
	}
	else if (this.direction == LEFT)
	{
		if(cell &&(!cell_right && nx))
		{
			this.direction = RIGHT;
		}
		if(!cell_down && cell_diag && nx)
		{
			this.direction = RIGHT;
		}
	}
};


enemy.prototype.draw = function(offsetX, offsetY)
{
	context.drawImage(this.image, this.position.x -offsetX, this.position.y - offsetY, this.width, this.height);
};
