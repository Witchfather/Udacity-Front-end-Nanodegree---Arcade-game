// udacity : Enemies our player must avoid

var Enemy = function() {
    //udacity : Variables applied to each of our instances go here,
    //udacity : we've provided one for you to get started

    //udacity :  The image/sprite for our enemies, this uses
    //udacity : a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png'; //enemy bug image
    this.y_pos_choice = [324,304,284,264,244,224,204,184,164,144,124]; //set of y positions the bug can appear at
    this.x = 0; //initial x coordinate for bug
    this.y = this.y_pos_choice[randomize(10,0)]; //randomize y coordinate to make y position unpredictable
    this.speed = randomize(6,2); //randomize speed value to make it unpredictable

};

//udacity :  Update the enemy's position, required method for game
//udacity :  Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    //udacity :  You should multiply any movement by the dt parameter
    //udacity :  which will ensure the game runs at the same speed for
    //udacity :  all computers.

    this.x += this.speed ; // update x value using speed property

    //make the bug loop back to the left of the screen with unpredictable y position and speed
    if (this.x > 505) {
        this.x = 0; //reset x to the initial position
        this.y = this.y_pos_choice[randomize(10,0)]; //choose random unpredictable y position
        this.speed = randomize(6,2); //randomize the speed to make it unpredictable
    }

    collide(this);//checks for collisions
};

//udacity :  Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//udacity :  Now write your own player class
//udacity :  This class requires an update(), render() and
//udacity :  a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png'; //character's image
    this.x = 202; //initial x coordinate
    this.y = 404; //initial y coordinate
    this.change_x = 0; //change in x coordinate initialised to 0
    this.change_y = 0; //change in y coordinate initialised to 0
    this.lives = 3; //Initial lives

};
Player.prototype.update = function(dt) {

    this.x += this.change_x; //change x position
    //the following code does not allow the player to move off the screen limits
    if (this.x  <= -48 || this.x  >= 452){
        this.x -= this.change_x; //cancel out the change in position by subtracting it. This keeps the x position constant
    }
    this.change_x = 0;//reset value

    this.y += this.change_y;//change y position
    if (this.y >= 454 || this.y < -40 ){
        this.y -= this.change_y; //cancel out the change in position by subtracting it. This keeps the y position

    }

    if (this.y === -12){ //winning position for the game, clears off all the enemies and prints the message
        display('Awesome! Refresh to play again!');
        allEnemies = [];
    }

    this.change_y = 0;//reset y position
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};



Player.prototype.handleInput = function (key){
    //compares keypresses to the movement and updates the value for change accordingly so that the player moves on the screen
    if (key === 'left'){
        //if key pressed is left, move left by 50 positions
        this.change_x = -50;
    }
    if (key === 'right'){
        //if key pressed is right, move right by 50 positions
        this.change_x = 50;
    }
    if (key === 'up'){
        //if key pressed is up, move up by 32  positions
        this.change_y = -32;
    }
    if (key === 'down') {
        //if key pressed is down, move down by 32 positions
        this.change_y = 32;
    }
};

var collide = function (enemy_bug) {
    //checks for collisions between the bug and the player. If true, resets the position of the player
    var dist_x = (player.x)- enemy_bug.x; //take the difference between the x position
    var dist_y = (player.y + 100) - enemy_bug.y; //take the difference between the y position
    if ( dist_x >= -5 && dist_x <= 5 && dist_y >= -20 && dist_y <= 20 ) {
        //check for collisions. If both the x and y position fall between this range and collision occurs.
        //Reset the player's position
        player.lives--;//reduce player's life by one when collision occurs
        resetCollision();
    }

};


var randomize = function (max,min) {
    //generates numbers between two given integers
    return (Math.floor(Math.random()*(max-min+1)) + min);
};

var resetCollision = function () {
    //resets after collision and displays appropriate message in case the game is over
    if ( player.lives >= 1 ) {
        display('Collision! Lives left = ' + player.lives); //lives left
    }
    else { //zero lives left, hence game over message printed
        display('GAME OVER! REFRESH TO PLAY AGAIN');
    }

    player.x = 202;//reset x position
    player.y = 404;//reset y position

};

var display = function (par) {
    //displays string based on the parameter par received
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];
    Show.innerHTML = par;
    document.body.insertBefore(Show, firstCanvasTag[0]);
};

//udacity :  Now instantiate your objects.
//udacity : Place all enemy objects in an array called allEnemies
//udacity :  Place the player object in a variable called player

var allEnemies = [];//empty array for bugs
allEnemies.push(new Enemy());//instantiating bugs


for ( var i = 0 ; i < 5 ; i++ ){//to have more than 1 bug on the screen
    allEnemies.push(new Enemy());
}

var player = new Player();//instantiating a player

var Show = document.createElement('div');


// udacity : This listens for key presses and sends the keys to your
//udacity :  Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
