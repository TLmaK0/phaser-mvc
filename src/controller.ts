import * as Phaser from 'phaser-ce';

import { Bootstrap } from './bootstrap';
import { IActionParams } from './i_action_params';
import { IControllerMap } from './i_controller_map';
import { IModel } from './i_model';
import { IViewMap } from './i_view_map';
import { View } from './view';

/**
 * Controller accepts input from view and converts modifieds the model.
 */
export abstract class Controller {
  public views: IViewMap;
  public bootstrap: Bootstrap;
  public model: IModel = {};

  public get game(): Phaser.Game {
    return this.bootstrap.game;
  }

  public goTo(controllerName: string, controllerAction: string, params: IActionParams): void {
    this.bootstrap.goTo(controllerName, controllerAction, params);
  }

  public getView(viewName: string): View {
    const view = this.views[viewName];
    if (view == null) {
      throw EvalError(`View ${viewName} not exist. Be sure you have added it to your controller.`);
    }

    return view;
  }

  protected render(view: View): void {
    view.init(this);
  }

  protected refresh(view: View): void {
    view.refresh();
  }
}
