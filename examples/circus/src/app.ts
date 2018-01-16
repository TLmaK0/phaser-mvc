import { Bootstrap } from 'phaser-mvc';
import { GameController } from './controllers/game_controller';
import { CircusController } from './controllers/circus_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  const boot = new Bootstrap(1000, 700);
  boot.addController('GameController', GameController);
  boot.addController('CircusController', CircusController);
  boot.start('GameController', 'startGame', {});
};
