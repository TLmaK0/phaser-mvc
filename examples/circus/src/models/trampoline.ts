import * as Phaser from 'phaser-ce';
import { Witcase } from 'phaser-mvc';

export class Trampoline {
  body: Phaser.Physics.P2.Body;

  constructor(){
    const engine = <Phaser.Game>Witcase.current.engine;
    const sprite = engine.add.sprite(0,0, null);
    engine.physics.p2.enable(sprite);
    this.body = new Phaser.Physics.P2.Body(engine, sprite, 0, 0, 1);
  }
}
