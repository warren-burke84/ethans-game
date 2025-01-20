import { Scene } from 'phaser';

export class NewScene extends Scene {
    blackSquare: Phaser.GameObjects.Rectangle;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    aKey: Phaser.Input.Keyboard.Key;
    dKey: Phaser.Input.Keyboard.Key;
    wKey: Phaser.Input.Keyboard.Key;
    spaceKey: Phaser.Input.Keyboard.Key;
    isJumping: boolean;
    jumpVelocity: number;
    gravity: number;
    redTriangle: Phaser.GameObjects.Triangle;

    constructor() {
        super('NewScene');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x0000ff);

        const text = this.add.text(512, 384, 'Bob doesn\'t like triangles', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff'
        });
        text.setOrigin(0.5);

        this.blackSquare = this.add.rectangle(25, 743, 50, 50, 0x000000);

        this.redTriangle = this.add.triangle(512, 768, 0, 0, 25, 50, 50, 0, 0xff0000);
        this.redTriangle.setOrigin(0.5);
        this.redTriangle.setRotation(Math.PI);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.isJumping = false;
        this.jumpVelocity = 0;
        this.gravity = 0.5;
    }

    update() {
        if (this.cursors.left.isDown || this.aKey.isDown) {
            this.blackSquare.x -= 5;
        } else if (this.cursors.right.isDown || this.dKey.isDown) {
            this.blackSquare.x += 5;
        }

        if ((this.cursors.up.isDown || this.wKey.isDown || this.spaceKey.isDown) && !this.isJumping) {
            this.isJumping = true;
            this.jumpVelocity = -10;
        }

        if (this.isJumping) {
            this.blackSquare.y += this.jumpVelocity;
            this.jumpVelocity += this.gravity;

            if (this.blackSquare.y >= 743) {
                this.blackSquare.y = 743;
                this.isJumping = false;
                this.jumpVelocity = 0;
            }
        }
    }
}
