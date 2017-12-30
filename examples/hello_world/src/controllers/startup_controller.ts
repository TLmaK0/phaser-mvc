import { IViewMap } from 'phaser-mvc';
import { Controller } from 'phaser-mvc';
import { StartupView } from '../views/startup_view';

/**
 * Startup controller
 */
export class StartupController extends Controller {
  public views: IViewMap = {
    startup: new StartupView()
  };

  constructor() {
    super();
    this.model.welcomeMessage = 'Hello world!';
  }

  public welcome = () => {
    this.render(this.views.startup);
  }
}
