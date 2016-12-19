/* A Brick in the game */
var Brick = function(BRICK_ROWS, BRICK_COLUMNS, row, column, width, height, hit, context) {
	this.width = width;					//Brickbreite
	this.height = height;				//Brickhöhe
	
	this.initX = 10;					//X-Initialisierungswert
	this.initY = 10;					//Y-Initialisierungswert
	this.distX = 5;						//Abstand X-Richtung
	this.distY = 5;						//Abstand Y-Richtung
	
	this.context = context;
	
	this.BRICK_ROWS = BRICK_ROWS;		//Reihen gesamt
	this.BRICK_COLUMNS = BRICK_COLUMNS;	//Spalten gesamt
	this.row = row;						//aktuelle Reihe
	this.column = column;				//aktuelle Spalte
				
	this.xPos = this.brickPositionX();	//aktuelle X-Position
	this.yPos = this.brickPositionY();	//aktuelle Y-Position
	
	this.brickHit = hit;
}

Brick.prototype.draw = function() {
	this.context.fillStyle = this.brickColor();
	this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
};

Brick.prototype.delete = function() {
	this.context.fillStyle = "black";
	this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
}

//Farben
Brick.prototype.brickColor = function() {
	if(this.row < 2) {
		return "red";
	} else if(this.row >= 2 && this.row < 3) {
		return "orange";
	} else if(this.row >= 3 && this.row < 4) {
		return "yellow";
	} else if(this.row >= 4) {
		return "green";
	}
};

//Spalten
Brick.prototype.brickPositionX = function() {
	if(this.column < this.BRICK_COLUMNS) {
		this.xPos = this.initX + this.column * (this.width + this.distX);
	} else {
		this.xPos = this.initX;
	}

	return this.xPos;
};

//Reihen 
Brick.prototype.brickPositionY = function() {
	if(this.row < this.BRICK_ROWS) {
		this.yPos = this.initY + this.row * (this.height + this.distY);
	} else {
		this.yPos = this.initY;
	}

	return this.yPos;
};

Brick.prototype.checkBallCollision = function(ball) {
	var borderY = this.brickPositionY() + this.height;
	var borderXleft = this.brickPositionX();
	var borderXright = borderXleft + this.width;
	var borderBallY = ball.yPos;
	var borderBallX = ball.xPos;
	
	if(borderY >= borderBallY) {
		if(borderBallX >= borderXleft && borderBallX <= borderXright && this.brickHit === false) {
			this.brickHit = true;
			ball.bounceHorizontally();
			this.row =- 1;
			}
	}
};