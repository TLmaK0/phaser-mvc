import { Controller, IViewMap } from 'phaser-mvc';
import { Circus } from '../models/circus';
import { CircusController } from './circus_controller';
import { PlayerKeysView } from '../views/player_keys_view';

/**
 * Game controller
 */
export class GameController extends Controller {
  public views: IViewMap = {
    playerKeys: new PlayerKeysView()
  };

  public startGame = () => {
    const circus = new Circus();
    this.model.circus = circus;
    this.render(this.views.playerKeys);
    this.goTo('CircusController', 'prepareCannon', { cannon: circus.cannon, trampoline: circus.trampoline });
  }
}
