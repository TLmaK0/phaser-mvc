import { Bootstrap } from 'phaser-mvc';
import { GameController } from './controllers/game_controller';
import { CannonController } from './controllers/cannon_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  const boot = new Bootstrap(1000, 700);
  boot.addController('GameController', GameController);
  boot.addController('CannonController', CannonController);
  boot.start('GameController', 'startGame', {});
};
