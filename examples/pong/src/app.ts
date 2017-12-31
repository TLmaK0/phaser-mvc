import { Bootstrap } from 'phaser-mvc';
import { GameController } from './controllers/game_controller';
import { FieldController } from './controllers/field_controller';
import { PlayersController } from './controllers/players_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  const boot = new Bootstrap();
  boot.addController('GameController', GameController);
  boot.addController('FieldController', FieldController);
  boot.addController('PlayersController', PlayersController);
  boot.start('GameController', 'startGame', {});
};
