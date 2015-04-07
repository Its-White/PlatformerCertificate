var Player = function() {
	this.image = document.createElement("img");
	this.position = new vector2(640/2, 480/2);
	
	this.width = 159;
	this.height = 163;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;
	
	this.image.src = "hero.png";
};

var playerIsDrawn = true;

Player.prototype.update = function(deltaTime){

	if(keyboard.isKeyDown(keyboard.KEY_A) == true)
	{
		this.rotation -= deltaTime;
	};
	if(keyboard.isKeyDown(keyboard.KEY_D) == true)
	{
		this.rotation += deltaTime;
	};
};

Player.prototype.draw = function(){
	context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
};
