import { View, ViewComponentAdder, WatchFactory, Bootstrap } from 'phaser-mvc';
import { Cannon } from '../models/cannon';
import { Human } from '../models/human';

const cannon = require('../assets/images/cannon.png');
const human = require('../assets/images/human.png');

Bootstrap.preload((game: Phaser.Game) => {
  game.load.image('cannon', cannon);
  game.load.image('human', human);
});

/**
 * Cannon View
 */
export class CannonView extends View {
  private cannonSprite: Phaser.Sprite;
  private humanSprite: Phaser.Sprite;

  private cannon: Cannon;
  private human: Human;

  public create(_componentAdder: ViewComponentAdder) {
    this.cannon = <Cannon>this.model.cannon;
    this.human = this.cannon.human;
    console.log(this.human);

    this.cannonSprite = this.game.add.sprite(this.cannon.x, this.cannon.y, 'cannon');
    this.cannonSprite.scale.setTo(0.5, 0.5);
    this.cannonSprite.anchor.setTo(0.5, 0.5);
    this.cannonSprite.angle = this.cannon.angle;

    this.humanSprite = this.game.add.sprite(this.human.x, this.human.y, 'human');
    this.humanSprite.scale.setTo(0.5, 0.5);
    this.humanSprite.angle = this.human.angle;
  }

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<number>(() => this.cannon.angle).subscribe(this.rotateCannon);
    watchFactory.create<Human>(() => this.human).subscribe(this.moveHuman);
  }

  private rotateCannon = (angle: number) => {
    this.cannonSprite.angle = angle;
  }

  private moveHuman = (human: Human) => {
    this.humanSprite.angle = human.angle;
    this.humanSprite.x = human.x;
    this.humanSprite.y = human.y;
  }
}
