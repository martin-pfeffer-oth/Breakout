/* Paddle represents the players paddle used to deflect the ball in the game */
var Paddle = function(xPos, yPos, canvasWidth, canvasHeight, context) {
	this.paddleWidth = 60;
	this.paddleHeight = 10;
	this.paddleCenter = this.paddleWidth / 2;
	this.color = "white";

	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;

	this.context = context;
	
	this.yPos = yPos;
	this.xPos;
}

Paddle.prototype.draw = function() {	
	this.context.fillStyle = this.color;
	this.context.fillRect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
};

Paddle.prototype.delete = function(newPos) {
	this.context.fillStyle = "black";
	this.context.fillRect(0, this.yPos, this.canvasWidth, this.paddleHeight);
};

Paddle.prototype.updateXPos = function(newPos) {
	if(newPos < this.paddleCenter) {					
		this.xPos = 0;
	}else if(newPos > this.canvasWidth - this.paddleCenter){
		this.xPos= this.canvasWidth - this.paddleWidth;
	}else{
		this.xPos = newPos - this.paddleCenter;
	}
};

Paddle.prototype.checkBallCollision = function(ball) {
	var borderBallBottomY = ball.yPos + ball.ballRadius;
	var borderPaddleTop = this.yPos;
	var borderGame = this.canvasHeight;
		
	if(borderPaddleTop <= borderBallBottomY) {		
		var ballXPos = ball.xPos + ball.ballRadius;
		var borderPaddleLeft = this.xPos;
		var borderPaddleRight = borderPaddleLeft + this.paddleWidth;
				
		if(borderPaddleLeft <= ballXPos && borderPaddleRight > ballXPos) {
			ball.ballCollision(true);
		}else{
			ball.ballCollision(false);
		}
	}
};