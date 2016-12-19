/*
 * This is the main script for the breakout application.
 *
 * Mouse interaction is captured here and the animation loop runs here, so that
 * the game can be drawn. This is also a good place to calculate random speeds for the
 * ball.
 *
 */
var breakOutGame = (function () {
	// private vars and constants
    var privateContext;
	var privateCanvas;
    
	//game
	var GAME_WIDTH = 600;
	var GAME_HEIGHT = 500;
	
	//brick
	var BRICK_ROWS = 5;
	var BRICK_COLUMNS = 13;
	var BRICK_WIDTH = 40;
	var BRICK_HEIGHT = 10;
	
	//paddle
	var PADDLE_YPOS = 480;
	var PADDLE_XPOS;
	
	//ball
	var BALLSIZE = 10;

	//game objects
	var bricks = [];
	var paddle;
	var ball;
	var screen;

	//Zeichenfunktion
	function privateDraw() {
        console.log("Drawing!");
		
		drawPaddle();
		drawBricks();
		drawBall();	
		
        window.requestAnimationFrame(privateDraw);
	}
	
	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}
	
	function pulicInitStart(canvas) {
		privateSetContext(canvas);
		setupStart(canvas);
		screen.eventStart();
	}
	
	//Initialisierung der Game-Objekte
	function publicInit(difficulty) {
		setupPaddle();
		setupBall(difficulty);
		setupBricks();
		setupMouseListener();
		window.requestAnimationFrame(privateDraw);
	}
	
	//Start-Screen
	function setupStart() {
		screen = new Screen(GAME_WIDTH, GAME_HEIGHT, privateContext, canvas);
	}
		
	function drawStartScreen() {
		screen.startScreenDraw();
	}
		
	//Paddle
	function setupPaddle() {
		paddle = new Paddle(PADDLE_XPOS, PADDLE_YPOS, GAME_WIDTH, GAME_HEIGHT, privateContext);
	}
	
	function drawPaddle() {
		paddle.delete();
		paddle.updateXPos(PADDLE_XPOS);
		paddle.draw();
		paddle.checkBallCollision(ball);
	}
	
	//Ball
	function setupBall(difficulty) {
		ball = new Ball(GAME_WIDTH / 2, GAME_HEIGHT / 2, difficulty, BALLSIZE, GAME_WIDTH, GAME_HEIGHT, privateContext);
	}
	
	function drawBall() {
		ball.delete();
		ball.draw();

		if(ball.outOfGame() === "lose") {
			screen.winScreenDraw("GAME OVER. Please refresh for restart.");
		}
		if(ball.outOfGame() === "win") {
			screen.winScreenDraw("YOU WIN");
		}
		
	}

	//Bricks
	function setupBricks() {
		var hit = false;
		
		for(var i = 0; i < BRICK_COLUMNS; i++) {
			for(var j = 0; j < BRICK_ROWS; j++) {
				var brick = new Brick(BRICK_ROWS, BRICK_COLUMNS, j , i, BRICK_WIDTH, BRICK_HEIGHT, hit, privateContext);
				bricks.push(brick);
			}
		}
	}
	
	function drawBricks() {
		for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
			bricks[i].checkBallCollision(ball);

			if(bricks[i].brickHit == false) {
				bricks[i].draw();
			}else{
				bricks[i].delete();
			}
		}
	}
	
	//Eventlistener
	function setupMouseListener() {
		privateCanvas.addEventListener("mousemove", updatePaddlePosition);
	}
	
	function updatePaddlePosition(e) {
		PADDLE_XPOS = e.clientX;
	}
		
	return {
		init: publicInit,
		initStart: pulicInitStart
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.initStart(canvas);