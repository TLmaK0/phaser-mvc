import { Controller } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { PlayersController } from './players_controller';

/**
 * Game controller
 */
export class GameController extends Controller {
  public pong = new Pong();

  public startGame = () => {
    this.goTo('FieldController', 'prepareField', { score: this.pong.score });
    this.goTo('PlayersController', 'preparePlayers', { pong: this.pong });
  }
}

