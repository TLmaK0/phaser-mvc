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

    this.playerKeysView.rotateCannon.subscribe(this.rotateCannon);

    this.playerKeysView.rotateCannonStop.subscribe(this.rotateCannonStop);
    this.playerKeysView.launchHuman.subscribe(this.launchHuman);

    this.playerKeysView.show();

    this.circusView.cannon = this.cannon;
    this.circusView.trampoline = trampoline;
    this.circusView.human = cannon.human;
    this.circusView.show();
  }

  private rotateCannon = (direction: string) => {
    if (direction == 'clockwise') this.cannon.rotateClockwise();
    else this.cannon.rotateCounterclockwise();
  }

  private rotateCannonStop = () => {
    this.cannon.rotateStop();
  }

  private launchHuman = () => {
    this.cannon.launchHuman();
  }
}
