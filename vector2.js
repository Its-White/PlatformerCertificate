var Vector2 = function()
{
	this.x = 0;
	this.y = 0;
}

Vector2.prototype.add = function(other_vector)
{
	var result = new Vector2();
	result.x = this.x + other_vector.x;
	result.y = this.y + other_vector.y;
	
	return result;
}

Vector2.prototype.subtract = function(other_vector)
{
	var result = new Vector2();
	
	result.x = this.x - other_vector.x;
	result.y = this.y - other_vector.y;
	
	return result;
}

Vector2.prototype.multiplyScalar = function(scalar)
{
	var result = new Vector2();
	
	result.x = this.x * scalar;
	result.y = this.y * scalar;
	
	return result;
}

Vector2.prototype.length = function()
{
	var result = Math.sqrt(this.x * this.x + this.y * this.y);
	return result;
}

Vector2.prototype.normalize = function()
{
	var len = this.length();
	var result = new Vector2();
	
	result.x = this.x / len;
	result.y = this.y / len;
	
	return result;
}

Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
	
	return new Vector2(x,y);
}

Vector2.prototype.toString = function ()
{
	return "(" + Math.round(this.x * 100)/100 + ", " + Math.round(this.y * 100)/100 + ")"; 
}