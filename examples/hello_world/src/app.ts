import { Bootstrap } from 'phaser-mvc';
import { StartupController } from './controllers/startup_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  Bootstrap.run(new StartupController().welcome);
};
