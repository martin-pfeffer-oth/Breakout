/* The ball in the game */
var Ball = function(initialXPos, initialYPos, difficulty, ballDiameter, gameWidth, gameHeight, context) {
	this.ballDiameter = ballDiameter;
	this.ballRadius = ballDiameter / 2;
	this.context = context;
	
	this.gameHeight = gameHeight;
	this.gameWidth = gameWidth;
	
	this.initialXPos = initialXPos;
	this.initialYPos = initialYPos;
	
	this.xPos = initialXPos;
	this.yPos = initialYPos;
	
	this.win = ""; 
	this.lose = "";
		
	this.xSpeed = difficulty;
	this.ySpeed = difficulty;
}

Ball.prototype.draw = function() {	
	this.bounceVertically();
	
	this.context.fillStyle = "white";
	this.context.beginPath();
	this.context.arc(this.xPos, this.yPos, this.ballRadius, 0, 2 * Math.PI);
	this.context.fill();
};

Ball.prototype.delete = function() {
	this.context.fillStyle = "black";
	this.context.beginPath();
	this.context.arc(this.xPos, this.yPos, this.ballRadius * 1.2, 0, 2 * Math.PI);
	this.context.fill();
	this.update();
};

Ball.prototype.update = function() {
	this.xPos += this.xSpeed;
	this.yPos += this.ySpeed;
}

Ball.prototype.bounceVertically = function() {
	var leftBorder = this.xPos - this.ballRadius;
	var rightBorder = this.xPos + this.ballRadius;
	
	if(rightBorder > this.gameWidth || leftBorder < 0) {
		this.xSpeed *= -1;
	}
};

//prallt von Brick ab
Ball.prototype.bounceHorizontally = function() {
	this.ySpeed *= -1;
}

Ball.prototype.ballCollision = function(hit) {
	if(hit === true) {
		this.ySpeed *= -1;
	}
};

Ball.prototype.stopBall = function() {
	this.ySpeed = 0;
	this.xSpeed = 0;
}

Ball.prototype.outOfGame = function() {
	var bottomBorder = this.gameHeight;
	var bottomBall = this.yPos - this.ballRadius;
	var topBorder = 0;
	var topBall = this.yPos + this.ballRadius;
	
	if(bottomBorder <= bottomBall) {
		this.stopBall();
		this.lose = "lose";
		
		return this.lose;
	}
	
	if(topBorder >= topBall) {
		this.stopBall();
		this.win = "true";
		
		return this.win;
	}
}