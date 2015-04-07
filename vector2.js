var vector2 = function(x, y){
	this.x = x;
	this.y = y;
	
	this.length = Math.sqrt(x*x + y*y);
	this.normalize = (this.x/this.length, this.y/this.length);
};


vector2.prototype.add = function(vect){
	var result = new vector2(this.x + vect.x, this.y + vect.y);
	
	return result;
};

vector2.prototype.subtract = function(vect){
	var result = new vector2(this.x - vect.x, this.y - vect.y);
	
	return result;
};

vector2.prototype.multiplyScalar = function(scalar){
	var result = new vector2(this.x * scalar, this.y * scalar);
	
	return result;
};

