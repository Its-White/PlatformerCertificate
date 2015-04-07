var enemy = function(){
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = 300;
	this.height = 300;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;
	
	this.image.src = "enemy.png";
};

enemy.prototype.update = function(deltaTime){

	if(playerIsDrawn == true){
		enemy.x = player.position.x + 200;
		enemy.y = player.position.y;
	};
	
};

enemy.prototype.draw = function(){
	context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
};