import { Bootstrap } from 'phaser-mvc';
import { GameController } from './controllers/game_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  Bootstrap.run(new GameController().startGame);
};
