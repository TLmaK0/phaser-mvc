import { Controller, IViewMap } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { PlayersController } from './players_controller';
import { FieldView } from '../views/field_view';

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

