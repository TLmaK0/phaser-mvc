import { Controller } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { FieldView } from '../views/field_view';
import { PlayersController } from './players_controller';

/**
 * Game controller
 */
export class GameController extends Controller {
  fieldView: FieldView = new FieldView();
  pong: Pong;

  constructor(){
    super();
    this.pong = new Pong();
    this.fieldView.pong = this.pong;
  }

  public startGame = () => {
    new PlayersController().preparePlayers(this.pong);
    this.pong.startGame();
    this.fieldView.show();
  }
}
