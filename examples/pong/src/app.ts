import { Bootstrap } from 'phaser-mvc';
import { GameController } from './controllers/game_controller';
import { PlayersController } from './controllers/players_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  const boot = new Bootstrap(1000, 700);
  boot.addController('GameController', GameController);
  boot.addController('PlayersController', PlayersController);
  boot.start('GameController', 'startGame', {});
};
