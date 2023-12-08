var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 588,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var cursors;
var twoTree;
var planeGroup;
var s;
var explosion;
var eolienne;
var eolienneGroup;
var lastEolienneTime = 0;
var eolienneCooldown = 1500;
var textLancerEolienne;
var textScoreEolienne;
var textScoreToReachEolienne;
var score = 0;
var oneMessage = true;
function preload () {
    this.load.image('twoTree', '/static/assets/twoTree.png', { frameWidth: 1, frameHeight: 1});
    this.load.image('background', '/static/assets/background.jpg', { frameWidth: 1, frameHeight: 1});
    this.load.image('plane', '/static/assets/plane.png', { frameWidth: 1, frameHeight: 1});
    this.load.spritesheet('explosion', '/static/assets/explosion.png', { frameWidth: 65, frameHeight: 70});
    this.load.image('eolienne', '/static/assets/eolienne.png', { frameWidth: 1, frameHeight: 1});
}

function create(){
    s = this;
    cursors = this.input.keyboard.createCursorKeys();
    
    background = this.add.sprite(400, 294, 'background');
    background.scale = 1.65;

    twoTree = this.physics.add.sprite(650, 294, 'twoTree');
    twoTree.scale = 0.6;
    twoTree.body.setSize(200, 400);

    planeGroup = this.physics.add.group();
    eolienneGroup = this.physics.add.group();

    textLancerEolienne = this.add.text(180, 100, 'Cliquez pour défendre la forêt !', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});
    textScoreToReachEolienne = this.add.text(10, 20, 'Score à atteindre:', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});
    textScoreEolienne = this.add.text(10, 70, 'Score:', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});

    this.input.on('pointerdown', function (pointer) {
        if (game.getTime() - lastEolienneTime > eolienneCooldown) {
            var randomX = Phaser.Math.Between(800, 900);
            var randomY = Phaser.Math.Between(0, 588);
            createEolienne(randomX, randomY);
            lastEolienneTime = game.getTime();
        }
    });

    var eolienne;
    function createEolienne(x, y) {
        eolienne = s.physics.add.sprite(x, y, 'eolienne');
        s.tweens.add({
            targets: eolienne,
            angle: 360,
            duration: 1000,
            repeat: -1  
        });
        eolienneGroup.add(eolienne);
        eolienne.scale = 0.5;

        s.input.on('pointerup', function (pointer) {
            var angle = Phaser.Math.Angle.Between(eolienne.x, eolienne.y, pointer.x, pointer.y);
            angle = Phaser.Math.RadToDeg(angle);
            var velocityX = Math.cos(Phaser.Math.DegToRad(angle)) * 150;
            var velocityY = Math.sin(Phaser.Math.DegToRad(angle)) * 150;
            eolienne.setVelocity(velocityX, velocityY);
        });
    }

    function disapearTextEolienne() {
        s.tweens.add({
            targets: textLancerEolienne,
            alpha: 0,
            duration: 400,  
            ease: 'Linear',  
            callbackScope: this  
        });
    }
    setTimeout(disapearTextEolienne, 1000);

    function spawnPlane(){
        var randomX = Phaser.Math.Between(0, -100);
        var randomY = Phaser.Math.Between(0, 588);
        
        planeGroup.add(s.physics.add.sprite(randomX, randomY, 'plane'));
        planeGroup.getChildren().forEach((plane) => {
            plane.scale = 0.4;
            s.physics.moveToObject(plane, twoTree, 150);
            s.tweens.add({
                targets: plane,
                angle: 360,
                duration: 500,
                repeat: -1  
            });
        })
    }
    
    setInterval(spawnPlane, 2000);

    function collisionPlaneGroupTwoTree(plane, twoTree){
        explosion = s.physics.add.sprite(twoTree.x+100, twoTree.y, 'explosion');
        explosion.anims.play('explosion', true);

        twoTree.destroy();
    }

    function collisionEolienneGroupPlaneGroup(eolienne, plane){
        plane.destroy();
        eolienne.destroy();
        score += 1;
    }

    this.physics.add.overlap(planeGroup, twoTree, collisionPlaneGroupTwoTree);
    this.physics.add.overlap(eolienneGroup, planeGroup, collisionEolienneGroupPlaneGroup);

    this.anims.create({
        key: "explosion",
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 46 }),
        frameRate:20,
        repeat: 1
    });
}


function update () {
    // Set le texte
    textLancerEolienne.setText('Cliquez pour défendre la forêt !');
    textScoreToReachEolienne.setText('Score à atteindre: '+10);
    textScoreEolienne.setText('Score: '+score);

    if(score >= 10){
        if (oneMessage) {
            window.alert("Bravo vous avez sauvé la forêt pour de bon cette fois ci!");
            oneMessage = false;
        }window.location.href = "/";
    }
}

             
