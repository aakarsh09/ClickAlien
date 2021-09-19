//create a scene with class
var GameScene1 = new Phaser.Class({
  //The scene is noted.
  Extends: Phaser.Scene,

  initialize: function GameScene1() {
    //We create the scene and set the key.
    Phaser.Scene.call(this, { key: "GameScene1" });
  },

  preload: function () {
    this.load.image("noalien", "assets/no alien.png");
    this.load.image("sky", "assets/sky.png");
  },

  create: function () {
    //write start

    this.add.image(400, 300, "sky");

    txt2 = this.add.image(380, 250, "noalien");

    var txt1 = this.add.text(360, 280, "START");
    txt1.setFontSize(50);
    txt1.setOrigin(0.4, -2);

    var welcome = this.add.text(200, 280,"Aliens are invading you must stop them before they reach earth and destroy it!");
    welcome.setOrigin(0.22,-11);
    var instructions = this.add.text(200, 280,"Instructions: Click on the aliens to destroy them.");
    instructions.setOrigin(0,-20);

    txt2.setInteractive();

    txt1.setInteractive({ useHandCursor: true });
    //Let txt1 object interactively
    //pointerdown feature with mouse click
    txt1.setInteractive().on("pointerdown", function () {
      //Let's start another scene with start
      this.scene.scene.start("GameScene2");
    });

    this.input.on("gameobjectdown", function () {
      this.scene.scene.start("GameScene2");
    });
  },
});

var txt2;
var count = 0;

//create a scene with class
var GameScene2 = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    var alien1;
    var sprite2;
    Phaser.Scene.call(this, { key: "GameScene2" });
  },

  preload: function () {
    this.load.image("alien", "assets/alien100.png");
    this.load.image("alienboss", "assets/alienboss.png");
    this.load.image("virues", "assets/virues100.png");
    this.load.image("ship3", "assets/ship3.png");
    this.load.image("ship2", "assets/ship2.png");
    this.load.image("ship1", "assets/ship1.png");
    this.load.image("sky", "assets/sky.png");
  
  },

  create: function () {
    this.add.image(400, 300, "sky");

    this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3");
    this.ship2 = this.add.image(config.width / 2 + 50, config.height / 2, "ship2");
    this.ship1 = this.add.image(config.width / 2 + 50, config.height / 2, "ship1");

    alien1 = this.physics.add.image(100, 0, "alien");
    alien1.setScale(0.7); // to change size of the image 1 is original
    alien1.body.velocity.setTo(200, 200); // velocity direction initial
    alien1.body.collideWorldBounds = true;
    alien1.body.bounce.set(1);

    alien2 = this.physics.add.image(200, 550, "virues");
    alien2.setScale(0.7);
    alien2.body.velocity.setTo(100, 200);
    alien2.body.collideWorldBounds = true;
    alien2.body.bounce.set(1);

    alien3 = this.physics.add.image(300, 350, "alienboss");
    alien3.setScale(0.7);
    alien3.body.velocity.setTo(100, 200);
    alien3.body.collideWorldBounds = true;
    alien3.body.bounce.set(1);

    alien4 = this.physics.add.image(800, 550, "alien");
    alien4.setScale(0.7);
    alien4.body.velocity.setTo(100, 200);
    alien4.body.collideWorldBounds = true;
    alien4.body.bounce.set(1);

    alien5 = this.physics.add.image(800, 100, "virues");
    alien5.setScale(0.7);
    alien5.body.velocity.setTo(100, 200);
    alien5.body.collideWorldBounds = true;
    alien5.body.bounce.set(1);

    var score = this.add.text(360, 280, "Score: " + count);
    score.setFontSize(50);
    score.setOrigin(0.4, 5);


    alien1.setInteractive().on("pointerdown", function () {
      //Let's pause scene with pause
      alien1.destroy();
      count++;
      score.setText('Score: ' +count);

    });
    alien2.setInteractive().on("pointerdown", function () {
      //Let's pause scene with pause
      alien2.destroy();
      count++;
      score.setText('Score: ' +count);

    });
    alien3.setInteractive().on("pointerdown", function () {
      //Let's pause scene with pause
      alien3.destroy();
      count++;
      score.setText('Score: ' +count);

    });
    alien4.setInteractive().on("pointerdown", function () {
      //Let's pause scene with pause
      alien4.destroy();
      count++;
      score.setText('Score: ' +count);

    });
    alien5.setInteractive().on("pointerdown", function () {
      //Let's pause scene with pause
      alien5.destroy();
      count++;
      score.setText('Score: ' +count);

    });
  },

  update: function () {
  	this.moveShip(this.ship3, 7);
  	this.moveShip(this.ship2, 5);
  	this.moveShip(this.ship1, 9);
    if (count == 5) {
      var Win = this.add.text(360, 280, "You Win!!!");
      Win.setFontSize(50);
      Win.setOrigin(0.4,0);

      var playAgain = this.add.text(360, 280, "Play again?");
      playAgain.setFontSize(50);
      playAgain.setOrigin(0.4, -2);
      playAgain.setInteractive().on("pointerdown", function () {
        //Let's start another scene with start
        this.scene.scene.start("GameScene1");
        
        count = 0;
      });
    }
  },
  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  },
  resetShipPos(ship){
    // put the ship on the top
  ship.y = 0;
    // put the ship on a random position on the x axis
  var randomX = Phaser.Math.Between(0, config.width);
  ship.x = randomX;
  },
});

//settings required to configure the game
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  gravity: {
    x: 10,
    y: 10,
    debug: false,
  },
  physics: {
    default: "arcade",
  },
  scale: {
    //we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
},
  //set background color
  backgroundColor: 0x27ae60,

  //set scenes
  scene: [GameScene1, GameScene2],
};

var game = new Phaser.Game(config);
