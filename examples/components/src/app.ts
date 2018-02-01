import * as Phaser from 'phaser-ce';
import { Witcase, BaseEngine } from 'phaser-mvc';
import { StartupController } from './controllers/startup_controller';

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

          //wait until Phaser is ready to create first controller
          witcase.defaultAction = new StartupController().welcome;
          baseEngine.preload();
        },
        create: baseEngine.create,
        update: baseEngine.update,
        render: baseEngine.render
      }
    );

    return game;
  });
};
