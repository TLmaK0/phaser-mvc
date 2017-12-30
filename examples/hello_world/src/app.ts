import { Bootstrap } from 'phaser-mvc';
import { StartupController } from './controllers/startup_controller';

/*
 * Bootstrap game
 */
window.onload = () => {
  const boot = new Bootstrap();
  boot.addController('StartupController', StartupController);
  boot.start('StartupController', 'welcome', {});
};
