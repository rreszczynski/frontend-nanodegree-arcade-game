//variables declaration
var colWidth = 101; //width of column in the grid
var rowHeight = 83; //height of column in the grid

var cols = 5; //number of rows in the grid
var rows = 6; //number of columns in the gird

var yOffset = 30;

// Enemies our player must avoid
var Enemy = function() {
    this.speed = this.setSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = this.setXpos();
    this.y = this.setYpos();
  
};


//setting speed of the enemy to 1 of 4 possible values
Enemy.prototype.setSpeed = function() {
	return Math.floor(Math.random()*4)*100 + 150;
};

//setting the Y position of the enemy to 1 of 3 possible rows
Enemy.prototype.setYpos = function() {
	return rowHeight - yOffset + rowHeight * Math.floor(Math.random()*3);
};

//setting the x position of the enemy when first starting the game
Enemy.prototype.setXpos = function() {
	return colWidth * Math.floor(Math.random()*3);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > cols * colWidth) {
    	this.x = 0 - colWidth;
    	this.speed = this.setSpeed();
    	this.y = this.setYpos();
    }

    //checking if enemy is off the board and if true - resets it's position

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = colWidth * Math.floor(cols / 2);
	this.y = rowHeight * (rows-1) - yOffset;

	Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	Player.prototype.update = function(dt) {

	//checking for collisions with enemies
	allEnemies.forEach(function(enemy) {
		
		//comparing hitboxes
		if (player.y === enemy.y &&
			player.x + 16 + 66 >= enemy.x &&
			player.x + 16 <= enemy.x + 99 ) {

			player.x = colWidth * Math.floor(cols / 2);
			player.y = rowHeight * (rows-1) - yOffset;
		}
	});
	
	//checking if player won the game
	if (player.y + yOffset === 0) {console.log('you won!');}

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	};

	// this funcion checks if it's possible to move the player in the desired
	// location and if so - sets the new location
	Player.prototype.handleInput = function(keyCode) {
		switch(keyCode) {
			case 'left':
				if (this.x >= colWidth) {
					this.x -= colWidth;
				}
				break;

			case 'up':
				if (this.y > 0) {
					this.y -= rowHeight;
				}
				break;

			case 'right':
				if (this.x < (cols - 1) * colWidth) {
					this.x += colWidth;
				}
				break;

			case 'down':
				if (this.y + yOffset < (rows - 1) * rowHeight) {
					this.y +=rowHeight;
				}
		}
	};
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];


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
