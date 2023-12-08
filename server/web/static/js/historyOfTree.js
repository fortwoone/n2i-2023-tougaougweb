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
var speed = 7;
var s;
var SPACE;
var onePlayerTreeAttack = true;
var lastKeyArrowDown = "right";
var textStage;
var textScore;
var textScoreToReach;
var score = 0;
var texteDestructionForet;
var oneBadGuyAttack = true;
var textShoot;

function preload () {
    this.load.spritesheet('playerTree', '/static/assets/movePlayerTree.png', { frameWidth: 96, frameHeight: 96});
    this.load.spritesheet('playerTreeAttack', '/static/assets/playerTreeAttack.png', { frameWidth: 10, frameHeight: 30});
    this.load.spritesheet('badGuy', '/static/assets/moveEnnemies.png', { frameWidth: 85, frameHeight: 124});
    this.load.spritesheet('badGuyAttack', '/static/assets/badGuyAttack.png', { frameWidth: 85, frameHeight: 105});
    this.load.image('background', '/static/assets/background.jpg', { frameWidth: 1, frameHeight: 1});
}

function create(){
    s = this;
    cursors = this.input.keyboard.createCursorKeys();
    SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    background = this.add.sprite(400, 294, 'background');
    background.scale = 1.65;
    textStage = this.add.text(20, 20, 'Stage 1', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});
    textScoreToReach = this.add.text(160, 20, 'Score à atteindre:', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});
    textScore = this.add.text(20, 70, 'Score:', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});
    textShoot = this.add.text(130, 250, 'Appuyez sur espace pour vous protéger', { color: 'white', fontFamily: 'Arial', fontSize: '30px '});

    playerTree = this.physics.add.sprite(400, 294, 'playerTree');
    playerTree.scale = 0.6;
    texteDestructionForet = this.add.text(130, 250, 'Détruire la forêt c\'est mal !', { color: 'white', fontFamily: 'Arial', fontSize: '50px '});
    texteDestructionForet.alpha = 0;
    badGuyGroup = this.physics.add.group();
    playerTreeAttackGroup = this.physics.add.group();

    function spawnBadGuy(){
        var intervalSelector = Phaser.Math.Between(0, 1);

        if (intervalSelector === 0) {
            var randomX = Phaser.Math.Between(0, -100);
            var randomY = Phaser.Math.Between(0, 588);
        } else {
            var randomX = Phaser.Math.Between(800, 900);
            var randomY = Phaser.Math.Between(0, 588);
        }
        
        badGuyGroup.add(s.physics.add.sprite(randomX, randomY, 'badGuy'));
        badGuyGroup.getChildren().forEach((badGuy) => {
            badGuy.isAttacking = false;
            badGuy.body.setSize(50, 90);
            badGuy.setOffset(20, 17);
            badGuy.scale = 0.5;
        })
    }

    setInterval(spawnBadGuy, 2000);

    function timeResetPlayerTreeAttack(){
        onePlayerTreeAttack = true;
    }

    setInterval(timeResetPlayerTreeAttack, 500);

    function disapearTextShoot() {
        s.tweens.add({
            targets: textShoot,
            alpha: 0,
            duration: 400,  
            ease: 'Linear',  
            callbackScope: this  
        });
    }
    setTimeout(disapearTextShoot, 1000);

    function oneBadGuyAttack(){
        badGuy.isAttacking = true;
        badGuy.anims.stop("badGuyR");
        badGuy.anims.play("badGuyAttack");
        alert("hi")
    }
    setTimeout(oneBadGuyAttack, 1000);

    function collisionPlayerTreeBadGuy(playerTree, badGuy){
        playerTree.anims.stop();
        playerTree.visible = false; 
        window.alert("Vous n'avez pas réussi à sauver la forêt, appuyez sur f5 pour recommencer");
    }


    this.physics.add.collider(playerTree, badGuyGroup, collisionPlayerTreeBadGuy);

    

    // animations of playerTree
    this.anims.create({
        key: "playerTreeR",
        frames: this.anims.generateFrameNumbers('playerTree', { start: 8, end: 11 }),
        frameRate:7,
        repeat: -1
    });
    this.anims.create({
        key: "playerTreeL",
        frames: this.anims.generateFrameNumbers('playerTree', { start: 4, end: 7 }),
        frameRate:7,
        repeat: -1
    });
    this.anims.create({
        key: "playerTreeU",
        frames: this.anims.generateFrameNumbers('playerTree', { start: 12, end: 15 }),
        frameRate:7,
        repeat: -1
    });
    this.anims.create({
        key: "playerTreeD",
        frames: this.anims.generateFrameNumbers('playerTree', { start: 0, end: 3 }),
        frameRate:7,
        repeat: -1
    });

    // Animation of bad guy
    this.anims.create({
        key: "badGuyR",
        frames: this.anims.generateFrameNumbers('badGuy', { start: 0, end: 4 }),
        frameRate:7,
        repeat: -1
    });

    // Animation attack of player tree
    this.anims.create({
        key: "playerTreeAttack",
        frames: this.anims.generateFrameNumbers('playerTreeAttack', { start: 0, end: 3 }),
        frameRate:7,
        repeat: -1
    });

    // Animation attack of badGuy 
    this.anims.create({
        key: "badGuyAttack",
        frames: this.anims.generateFrameNumbers('badGuyAttack', { start: 0, end: 6 }),
        frameRate:7,
        repeat: 1
    });
}


function update () {
    // Texte
    textStage.setText("Stage 1");
    textScoreToReach.setText("Score à atteindre: " + 12);
    textScore.setText("Score: " + score);

    if(score >= 12){

        window.alert("Bravo vous avez sauvé la forêt !, appuyer sur ok pour passer au stage suivant");
        window.location.href = "/ubisoft/parti2";
    }

    // Force l'arbre à rester dans le cadre
    playerTree.x = Phaser.Math.Clamp(playerTree.x, 0, game.config.width);
    playerTree.y = Phaser.Math.Clamp(playerTree.y, 0, game.config.height);

    if(cursors.up.isDown){
        playerTree.y -= speed;
        playerTree.anims.play('playerTreeU', true);
        lastKeyArrowDown = "up";
    }
    if(cursors.down.isDown){
        playerTree.y += speed;
        playerTree.anims.play('playerTreeD', true);
        lastKeyArrowDown = "down";
    }
    if(cursors.right.isDown){
        playerTree.x += speed;
        playerTree.anims.play('playerTreeR', true);
        lastKeyArrowDown = "right";
    }
    if(cursors.left.isDown){
        playerTree.x -= speed;
        playerTree.anims.play('playerTreeL', true);
        lastKeyArrowDown = "left";
    }
  
    badGuyGroup.getChildren().forEach((badGuy) => {
        if (badGuy.isAttacking == true) {
            
        } else{
            badGuy.anims.play('badGuyR', true);
            if(badGuy.x > playerTree.x){
                badGuy.flipX = true;
            } else{
                badGuy.flipX = false;
            }
        }
        this.physics.moveToObject(badGuy, playerTree, 130);
    })

    if(cursors.up.isUp && cursors.down.isUp && cursors.right.isUp && cursors.left.isUp){
        playerTree.anims.stop();
        playerTree.setFrame(2);
    }

    if(SPACE.isDown){
        if(onePlayerTreeAttack == true){
            playerTreeAttackGroup.add(s.physics.add.sprite(playerTree.x, playerTree.y, 'playerTreeAttack'));
            playerTreeAttackGroup.getChildren().forEach((playerTreeAttack) => {
                playerTreeAttack.anims.play('playerTreeAttack', true);
                playerTreeAttack.scale = 1.5;
                if(lastKeyArrowDown == "up"){
                    playerTreeAttack.setVelocityY(-500);
                    playerTreeAttack.angle = 180;
    
                }
                if(lastKeyArrowDown == "down"){
                    playerTreeAttack.setVelocityY(500);
                }
                if(lastKeyArrowDown == "left"){
                    playerTreeAttack.setVelocityX(-500);
                    playerTreeAttack.angle = 90;
                    // changer boite collision
                }
                if(lastKeyArrowDown == "right"){
                    playerTreeAttack.setVelocityX(500);
                    playerTreeAttack.angle = 270;
                    // changer boite collision
                }
                
                function printTextePasBienDetruireForet() {
                    texteDestructionForet.alpha = 0;
                    this.tweens.add({
                        targets: texteDestructionForet,
                        alpha: 1,
                        duration: 400,  
                        ease: 'Linear',  
                        onComplete: function () {
                            this.tweens.add({
                                targets: texteDestructionForet,
                                alpha: 0,
                                duration: 400,  
                                ease: 'Linear',  
                            });
                        },
                        callbackScope: this  
                    });
                }
                
                function collisionPlayerTreeAttackbadGuyGroup(playerTreeAttack, badGuy) {
                    playerTreeAttack.destroy();
                    badGuy.destroy();
                    score += 1;
                    printTextePasBienDetruireForet.call(this);  
                }
                
                this.physics.add.collider(playerTreeAttack, badGuyGroup, collisionPlayerTreeAttackbadGuyGroup, null, this);
                
            })
            onePlayerTreeAttack = false;
        }
    }

    
}

                 
