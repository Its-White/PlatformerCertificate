var Player = function()
{
	this.sprite = new Sprite("ChuckNorris.png");
	
	//set up animations
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [0,1,2,3,4,5,6,7]);//LEFT IDLE ANIMATION
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [8,9,10,11,12]);//LEFT JUMP ANIMATION
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);//LEFT WALK ANIMATION
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [52,53,54,55,56,57,58,59]);//RIGHT IDLE ANIMATION
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [60,61,62,63,64]);//RIGHT JUMP ANIMATION
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [65,66,67,68,69,70,71,72,73,74,75,76,77,78]);//RIGHT WALK ANIMATION
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [42,43,44,45,46,47,48,49,50,51,52]);//CLIMBING
	
	this.armor = 0;
	this.health = 100;
	
	this.image = document.createElement("img");
	
	this.startPos = new Vector2();
	this.startPos.set(canvas.width/2, canvas.height / 2 /4)
	
	this.position = new Vector2();
	this.position.set(this.startPos.x, this.startPos.y);
	
	this.velocity = new Vector2();
	
	this.width = 165;
	this.height = 126;
	
	this.jumping = false;
	this.falling = false;
	this.climbing = false;
	
	this.angularVelocity = 0;
	this.rotation = 0;
	
	this.image.src = "hero.png";

	for (var i = 0; i < ANIM_MAX ; ++i)
	{
		this.sprite.setAnimationOffset(i, - this.width/2, -this.height/2);
	}
};



//var playerIsDrawn = true;

Player.prototype.changeDirectionalAnimation = function(leftAnim, rightAnim)
{	

	if (this.direction == LEFT)
	{
		if (this.sprite.currentAnimation != leftAnim)
		{
			this.sprite.setAnimation(leftAnim);
		}
	}
	else if(this.direction == RIGHT)
	{
		if (this.sprite.currentAnimation != rightAnim)
		{
			this.sprite.setAnimation(rightAnim);
		}
	}
}


Player.prototype.update = function(deltaTime, offsetX, offsetY)
{
	this.sprite.update(deltaTime);
	
	var acceleration = new Vector2();
	var playerAccel = 5000;
	var playerDrag = 11;
	var playerGravity = TILE * 9.8 * 4;
	
	var jumpForce = 47500;
	
	acceleration.y = playerGravity;
		

	
	
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
	
	var cell_ladder = cellAtTileCoord(LAYER_LADDERS, tx, ty);
	
	if(keyboard.isKeyDown(keyboard.KEY_LEFT))
	{
		acceleration.x -= playerAccel;
		this.direction = LEFT;
	}
	if(keyboard.isKeyDown(keyboard.KEY_RIGHT))
	{
		acceleration.x += playerAccel;
		this.direction = RIGHT;
	}

	if(this.velocity.y > 0)
	{
		this.falling = true;
	}
	else
	{
		this.falling = false;
	}
	
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) && !this.jumping && !this.falling)
	{
		acceleration.y -= jumpForce;
		this.jumping = true;
	}
	
	
	if(keyboard.isKeyDown(keyboard.KEY_UP) && cell_ladder)
	{
		acceleration.y -= playerAccel;
	}

	

	
	
	var dragVector = this.velocity.multiplyScalar(playerDrag);
	dragVector.y = 0;
	acceleration = acceleration.subtract(dragVector);
	
	
	this.velocity = this.velocity.add(acceleration.multiplyScalar(deltaTime));
	this.position = this.position.add(this.velocity.multiplyScalar(deltaTime));
	
	//animation logic
	
	
	


	if(this.jumping || this.falling)
	{
		this.changeDirectionalAnimation(ANIM_JUMP_LEFT, ANIM_JUMP_RIGHT);
	}
	else
	{
		if(Math.abs(this.velocity.x)> 25)
		{
			this.changeDirectionalAnimation(ANIM_WALK_LEFT, ANIM_WALK_RIGHT);
		}
		else
		{
			this.changeDirectionalAnimation(ANIM_IDLE_LEFT, ANIM_IDLE_RIGHT);
		}
	}
	

	
	if(this.velocity.y > 0)
	{
		if((cell_down && !cell) || (cell_diag && !cell_right && nx))
		{
			this.position.y = tileToPixel(ty) - collisionOffset.y;
			this.velocity.y = 0;
			ny = 0;
			
			this.jumping = false;
			
		}
	}
	else if (this.velocity.y < 0)
	{
		if((cell && !cell_down) || (cell_right && !cell_diag && nx))
		{
			this.position.y = tileToPixel(ty +1) - collisionOffset.y;
			this.velocity.y = 0;
			
			cell = cell_down;
			cell_right = cell_diag;
			
			cell_down = cellAtTileCoord(LAYER_PLATFORMS, tx, ty+2);
			cell_diag = cellAtTileCoord(LAYER_PLATFORMS, tx+1, ty+2);
			
			ny = 0;
		}
	}
	
	if(this.velocity.x > 0)
	{
		if((cell_right && !cell) || (cell_diag && !cell_down && ny))
		{
			this.position.x = tileToPixel(tx) - collisionOffset.x;
			this.velocity.x = 0;
			
		}
	}
	else if (this.velocity.x < 0)
	{
		if((cell && !cell_right) || (cell_down && !cell_diag && ny))
		{
			this.position.x = tileToPixel(tx + 1) - collisionOffset.x;
			this.velocity.x = 0;
			
		}
	}


	

	
}



Player.prototype.draw = function(offsetX, offsetY)
{	
	this.sprite.draw(context, this.position.x - offsetX, this.position.y - offsetY);
};
