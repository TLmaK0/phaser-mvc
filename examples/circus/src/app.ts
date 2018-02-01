import { Witcase, BaseEngine } from 'phaser-mvc';
import { Container } from 'typescript-ioc';

import { GameController } from './controllers/game_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  let witcase = Witcase.create<Phaser.Game>();

  witcase.start((baseEngine: BaseEngine)=> {
    const game = new Phaser.Game(
      1000,
      750,
      Phaser.CANVAS,
      'content',
      {
        preload: () => {
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          game.physics.startSystem(Phaser.Physics.P2JS);
          game.physics.p2.gravity.y = 100

          //wait until Phaser is ready to create first controller
          witcase.defaultAction = Container.get(GameController).startGame;
          baseEngine.preload();
        },
        create: () => {
          baseEngine.create();
        },
        update: baseEngine.update,
        render: baseEngine.render
      }
    );

    return game;
  });
};
