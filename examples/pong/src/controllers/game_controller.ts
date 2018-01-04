import { Controller, IViewMap } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { FieldView } from '../views/field_view';
import { PlayersController } from './players_controller';

/**
 * Game controller
 */
export class GameController extends Controller {
  public views: IViewMap = {
    field: new FieldView()
  };

  public startGame = () => {
    const pong = new Pong();
    this.model.pong = pong;
    this.goTo('PlayersController', 'preparePlayers', { pong: pong });
    pong.startGame();
    this.render(this.views.field);
  }
}
