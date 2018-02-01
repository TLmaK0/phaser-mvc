import * as Phaser from 'phaser-ce';

import { View, ViewComponentAdder, WatchFactory } from 'phaser-mvc';
import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';

const cannon = require('../assets/images/cannon.png');
const human = require('../assets/images/human.png');
const trampoline = require('../assets/images/trampoline.png');


/**
 * Cannon View
 */
export class CircusView extends View<Phaser.Game> {
  private cannonSprite: Phaser.Sprite;
  private humanSprite: Phaser.Sprite;

  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  public preload(){
    this.engine.load.image('cannon', cannon);
    this.engine.load.image('human', human);
    this.engine.load.image('trampoline', trampoline);
  }

  public create(_componentAdder: ViewComponentAdder<Phaser.Game>) {
    const trampolineSprite = this.engine.add.sprite(this.trampoline.body.x, this.trampoline.body.y, 'trampoline');
    trampolineSprite.scale.setTo(0.5, 0.5);
    this.humanSprite = this.engine.add.sprite(this.human.body.x, this.human.body.y, 'human');
    this.humanSprite.scale.setTo(0.5, 0.5);
    this.humanSprite.visible = false;

    this.cannonSprite = this.engine.add.sprite(this.cannon.x, this.cannon.y, 'cannon');
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
    this.humanSprite.angle = this.human.body.angle;
    this.humanSprite.x = this.human.body.x;
    this.humanSprite.y = this.human.body.y;
  }

  private hideHuman = (hide: boolean) => {
    if (!hide) this.humanSprite.visible = true;
  }
}
