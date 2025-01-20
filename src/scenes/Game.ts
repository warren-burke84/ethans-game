import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    blackSquare: Phaser.GameObjects.Rectangle;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    aKey: Phaser.Input.Keyboard.Key;
    dKey: Phaser.Input.Keyboard.Key;
    wKey: Phaser.Input.Keyboard.Key;
    spaceKey: Phaser.Input.Keyboard.Key;
    isJumping: boolean;
    jumpVelocity: number;
    gravity: number;
    bobText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.blackSquare = this.add.rectangle(25, 743, 50, 50, 0x000000);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.isJumping = false;
        this.jumpVelocity = 0;
        this.gravity = 0.5;

        this.bobText = this.add.text(512, 500, 'This is Bob', {
            fontFamily: 'Arial', fontSize: 48, color: '#ffffff'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    update ()
    {
        if (this.cursors.left.isDown || this.aKey.isDown)
        {
            this.blackSquare.x -= 5;
        }
        else if (this.cursors.right.isDown || this.dKey.isDown)
        {
            this.blackSquare.x += 5;
        }

        if ((this.cursors.up.isDown || this.wKey.isDown || this.spaceKey.isDown) && !this.isJumping)
        {
            this.isJumping = true;
            this.jumpVelocity = -10;
        }

        if (this.isJumping)
        {
            this.blackSquare.y += this.jumpVelocity;
            this.jumpVelocity += this.gravity;

            if (this.blackSquare.y >= 743)
            {
                this.blackSquare.y = 743;
                this.isJumping = false;
                this.jumpVelocity = 0;
            }
        }

        if (this.blackSquare.x >= 1024)
        {
            this.scene.start('NewScene');
        }
    }
}
