import { Bootstrap } from 'phaser-mvc';
import { FieldController } from './controllers/field_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  const boot = new Bootstrap();
  boot.addController('FieldController', FieldController);
  boot.start('FieldController', 'startGame', {});
};
