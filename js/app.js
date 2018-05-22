//variables declaration
var colWidth = 101; //width of column in the grid
var rowHeight = 83; //height of column in the grid

var cols = 5; //number of rows in the grid
var rows = 6; //number of columns in the gird

var yOffset = 30; //player y position offset related to the tile

const winModal = document.getElementsByClassName('winModal')[0]; //modal, displaying when winning the game
console.log(winModal);
winModal.style.display = 'none';

// Enemies our player must avoid
class Enemy {
	constructor() {
    	this.speed = this.setSpeed();
    	// The image/sprite for our enemies, this uses
    	// a helper we've provided to easily load images
    	this.sprite = 'images/enemy-bug.png';
    	this.x = this.setXpos();
    	this.y = this.setYpos();
	}

	//setting speed of the enemy to 1 of 4 possible values
	setSpeed() {
		return Math.floor(Math.random()*4)*100 + 150;
	}

	//setting the Y position of the enemy to 1 of 3 possible rows
	setYpos() {
		return rowHeight - yOffset + rowHeight * Math.floor(Math.random()*3);
	}

	//setting the x position of the enemy when first starting the game
	setXpos() {
		return colWidth * Math.floor(Math.random()*3);
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
	    this.x += this.speed * dt;

    	//checking if enemy is off the board and if true - resets it's position
    	if (this.x > cols * colWidth) {
    		this.x = 0 - colWidth;
    		this.speed = this.setSpeed();
    		this.y = this.setYpos();
    	}
	}

	// Draw the enemy on the screen, required method for game
	render() {
    	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}


//player that you're controlling
class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.x = colWidth * Math.floor(cols / 2);
		this.y = rowHeight * (rows-1) - yOffset;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update(enemies) {
		player = this;
		//checking for collisions with enemies
		enemies.forEach(enemy => {
		
		//comparing hitboxes
			if (player.y === enemy.y &&
				player.x + 16 + 66 >= enemy.x &&
				player.x + 16 <= enemy.x + 99 ) {

				player.x = colWidth * Math.floor(cols / 2);
				player.y = rowHeight * (rows-1) - yOffset;
			}
		});
	
		//checking if player won the game

		if (this.y + yOffset === 0) {
			winModal.style.display = 'block';
			//console.log('you won!');
		}
	}

	// this funcion checks if it's possible to move the player in the desired
	// location and if so - sets the new location
	handleInput(keyCode) {
		if (keyCode === 'left' && this.x >= colWidth) {
			this.x -= colWidth;
		}
		else if (keyCode === 'up' && this.y > 0) {
			this.y -= rowHeight;
		}
		else if (keyCode === 'right' && this.x < (cols - 1) * colWidth) {
			this.x += colWidth;
		}
		else if (keyCode === 'down' && this.y + yOffset < (rows - 1) * rowHeight) {
			this.y +=rowHeight;
		}
	}
}


//creating enemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

//creating player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
