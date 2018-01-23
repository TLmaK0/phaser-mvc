import { Controller } from 'phaser-mvc';
import { CircusView } from '../views/circus_view';
import { Cannon } from '../models/cannon';
import { Trampoline } from '../models/trampoline';
import { PlayerKeysView } from '../views/player_keys_view';

/**
 * Circus controller
 */
export class CircusController extends Controller {
  circusView = new CircusView();
  playerKeysView = new PlayerKeysView();
  cannon: Cannon;

  public prepareCannon = (cannon: Cannon, trampoline: Trampoline) => {
    this.cannon = cannon;

    this.playerKeysView.rotateCannon = this.rotateCannon;
    this.playerKeysView.rotateCannonStop = this.rotateCannonStop;
    this.playerKeysView.launchHuman = this.launchHuman;
    this.playerKeysView.show();

    this.circusView.cannon = this.cannon;
    this.circusView.trampoline = trampoline;
    this.circusView.human = cannon.human;
    this.circusView.show();
  }

  public rotateCannon = (direction: string) => {
    if (direction == 'clockwise') this.cannon.rotateClockwise();
    else this.cannon.rotateCounterclockwise();
  }

  public rotateCannonStop = () => {
    this.cannon.rotateStop();
  }

  public launchHuman = () => {
    this.cannon.launchHuman();
  }
}
