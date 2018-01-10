import { Controller, IActionParams, IViewMap } from 'phaser-mvc';
import { CannonView } from '../views/cannon_view';
import { Cannon } from '../models/cannon';

/**
 * Game controller
 */
export class CannonController extends Controller {
  public views: IViewMap = {
    cannon: new CannonView()
  };

  public prepareCannon = (params: IActionParams) => {
    this.model.cannon = params.cannon;
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
