import { View, ViewComponentAdder, WatchFactory, Bootstrap } from 'phaser-mvc';
import { Cannon } from '../models/cannon';

const cannon = require('../assets/images/cannon.png');

Bootstrap.preload((game: Phaser.Game) => {
  game.load.image('cannon', cannon);
});

/**
 * Cannon View
 */
export class CannonView extends View {
  private cannonSprite: Phaser.Sprite;
  private cannon: Cannon;

  public create(_componentAdder: ViewComponentAdder) {
    this.cannon = <Cannon>this.model.cannon;
    this.cannonSprite = this.game.add.sprite(this.cannon.x, this.cannon.y, 'cannon');
    this.cannonSprite.scale.setTo(0.5, 0.5);
    this.cannonSprite.anchor.setTo(0.5, 0.5);
    this.cannonSprite.angle = this.cannon.angle;
  }

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<number>(() => this.cannon.angle).subscribe(this.rotateCannon);
  }

  private rotateCannon = (angle: number) => {
    this.cannonSprite.angle = angle;
  }
}
