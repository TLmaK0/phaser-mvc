import { Controller } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { FieldView } from '../views/field_view';
import { PlayersController } from './players_controller';

/**
 * Game controller
 */
export class GameController extends Controller {
  fieldView: FieldView = new FieldView();

  public startGame = () => {
    const pong = new Pong();
    this.fieldView.pong = pong;
    new PlayersController().preparePlayers(pong);
    pong.startGame();
    this.fieldView.show();
  }
}
