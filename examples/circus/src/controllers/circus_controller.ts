import { Controller, IActionParams, IViewMap } from 'phaser-mvc';
import { CircusView } from '../views/circus_view';
import { Cannon } from '../models/cannon';

/**
 * Game controller
 */
export class CircusController extends Controller {
  public views: IViewMap = {
    cannon: new CircusView()
  };

  public prepareCannon = (params: IActionParams) => {
    this.model.cannon = params.cannon;
    this.model.trampoline = params.trampoline;
    this.render(this.views.cannon);
  }

  public rotateCannon = (params: IActionParams) => {
    const cannon = <Cannon>this.model.cannon;
    if (params.direction == 'clockwise') cannon.rotateClockwise();
    else cannon.rotateCounterclockwise();
  }

  public rotateCannonStop = (_params: IActionParams) => {
    const cannon = <Cannon>this.model.cannon;
    cannon.rotateStop();
  }

  public launchHuman = (_params: IActionParams) => {
    const cannon = <Cannon>this.model.cannon;
    cannon.launchHuman();
  }
}
