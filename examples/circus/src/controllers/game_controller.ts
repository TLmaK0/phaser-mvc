import { Controller } from 'phaser-mvc';
import { Circus } from '../models/circus';
import { CircusController } from './circus_controller';

/**
 * Game controller
 */
export class GameController extends Controller {
  circus: Circus;

  public startGame = () => {
    this.circus = new Circus();
    new CircusController().prepareCannon(this.circus.cannon, this.circus.trampoline);
  }
}
