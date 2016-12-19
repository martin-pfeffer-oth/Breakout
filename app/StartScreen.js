var Screen = function(width, heigth, context, canvas) {
	this.width = width;
	this.heigth = heigth;
	
	this.context = context;
	this.canvas = canvas;
}

Screen.prototype.startScreenDraw = function() {
	this.context.fillStyle = "black";
	this.context.fillRect(0, 0, this.width, this.heigth);
};

Screen.prototype.winScreenDraw = function(text) {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height);
	this.context.textAlign = "center";
    this.context.font = "30px Roboto Condensed Light";
    this.context.fillStyle = "green";
    this.context.fillText(text, this.width / 2, this.heigth / 2);
};

Screen.prototype.eventStart = function() {
	var startButton = document.getElementById("startGameButton");
	
	startButton.addEventListener("click", this.startBreakOut);
};

Screen.prototype.startBreakOut = function() {
	var difficulty = document.getElementById("difficultyValue").value;
	var menuDiv = document.getElementById("menu");
	
	menuDiv.style.visibility = 'hidden';
	difficulty = Math.floor(difficulty);
	
	breakOutGame.init(difficulty);
};