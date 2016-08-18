// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 101;
    this.y = Math.floor(Math.random()*171) + 50;
    this.speed = Math.floor(Math.random()*4) + 2;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x > 505){
        this.x = 0;
        this.y = Math.floor(Math.random()*171) + 50;
        this.speed = Math.floor(Math.random()*4) + 2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
    this.change_x = 0;
    this.change_y = 0;
};
Player.prototype.update = function(dt) {

    this.x += this.change_x;
    if (this.x  === -98 || this.x  === 502){
        this.x -= this.change_x;
    }
    this.change_x = 0;

    this.y += this.change_y;
    if (this.y === 504 || this.y === -96 ){
        this.y -= this.change_y;
    }
    this.change_y = 0;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function (key){
    if (key === 'left'){
        this.change_x = -100;
    }
    if (key === 'right'){
        this.change_x = 100;
    }
    if (key === 'up'){
        this.change_y = -100;
    }
    if (key === 'down') {
        this.change_y = 100;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy());


for ( var i = 0 ; i < 2 ; i++ ){
    allEnemies.push(new Enemy());
}

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
