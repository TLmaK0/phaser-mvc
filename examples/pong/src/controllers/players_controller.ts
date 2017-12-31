import { Controller, IActionParams, IViewMap } from 'phaser-mvc';
import { PlayersView } from '../views/players_view';
import { Player } from '../models/player';

export class PlayersController extends Controller {
  public views: IViewMap = {
    players: new PlayersView()
  };

  public preparePlayers = (params: IActionParams) => {
    this.model.players = <Player[]>params.players;
    this.render(this.views.players);
  }
}
