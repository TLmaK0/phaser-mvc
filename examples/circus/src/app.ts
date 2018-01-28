import { Bootstrap } from 'phaser-mvc';
import { GameController } from './controllers/game_controller';

import { Container } from 'typescript-ioc';
/*
 * Bootstrap game
 */
window.onload = () => {
  Bootstrap.worldConfiguration.bounds = { width: 1000, height: 750 };
  Bootstrap.run(Container.get(GameController).startGame);
};
