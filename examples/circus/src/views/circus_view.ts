import { View, ViewComponentAdder, WatchFactory, Bootstrap } from 'phaser-mvc';
import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';

const cannon = require('../assets/images/cannon.png');
const human = require('../assets/images/human.png');
const trampoline = require('../assets/images/trampoline.png');

Bootstrap.preload((game: Phaser.Game) => {
  game.load.image('cannon', cannon);
  game.load.image('human', human);
  game.load.image('trampoline', trampoline);
});

/**
 * Cannon View
 */
export class CircusView extends View {
  private cannonSprite: Phaser.Sprite;
  private humanSprite: Phaser.Sprite;

  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  public create(_componentAdder: ViewComponentAdder) {
    const trampolineSprite = this.game.add.sprite(this.trampoline.x, this.trampoline.y, 'trampoline');
    trampolineSprite.scale.setTo(0.5, 0.5);
    this.humanSprite = this.game.add.sprite(this.human.x, this.human.y, 'human');
    this.humanSprite.scale.setTo(0.5, 0.5);
    this.humanSprite.visible = false;

    this.cannonSprite = this.game.add.sprite(this.cannon.x, this.cannon.y, 'cannon');
    this.cannonSprite.scale.setTo(0.5, 0.5);
    this.cannonSprite.anchor.setTo(0.5, 0.5);
    this.cannonSprite.angle = this.cannon.angle;

  }

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<number>(() => this.cannon.angle).subscribe(this.rotateCannon);
    watchFactory.create<boolean>(() => this.cannon.hasHuman()).subscribe(this.hideHuman);
  }

  public update(){
    this.moveHuman();
  }

  private rotateCannon = (angle: number) => {
    this.cannonSprite.angle = angle;
  }

  private moveHuman = () => {
    this.humanSprite.angle = this.human.angle;
    this.humanSprite.x = this.human.x;
    this.humanSprite.y = this.human.y;
  }

  private hideHuman = (hide: boolean) => {
    if (!hide) this.humanSprite.visible = true;
  }
}
