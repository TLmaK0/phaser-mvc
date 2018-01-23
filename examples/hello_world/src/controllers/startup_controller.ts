import { IViewMap } from 'phaser-mvc';
import { Controller } from 'phaser-mvc';
import { StartupView } from '../views/startup_view';

/**
 * Startup controller
 */
export class StartupController extends Controller {
  private startupView: StartupView;

  constructor(){
    super();
    this.startupView = new StartupView(this);
    this.startupView.welcomeMessage = 'Hello world!';
  }

  public welcome = () => {
    this.startupView.show();
  }
}
