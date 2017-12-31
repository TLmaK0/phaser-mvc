import { Controller, IActionParams, IViewMap } from 'phaser-mvc';
import { PlayersView } from '../views/players_view';
import { PlayersKeyboardView } from '../views/players_keyboard_view';
import { Pong } from '../models/pong';

export class PlayersController extends Controller {
  public views: IViewMap = {
    players: new PlayersView(),
    playersKeyboard: new PlayersKeyboardView()
  };

  public preparePlayers = (params: IActionParams) => {
    this.model.pong = <Pong>params.pong;
    this.render(this.views.players);
    this.render(this.views.playersKeyboard);
  }

  public MovePlayer = (params: IActionParams) => {
    const playerId = <number>params.player;
    const direction = <string>params.direction;

    const pong = <Pong> this.model.pong;

    switch(direction){
      case 'up':
        pong.movePlayerUp(playerId);
        break;
      case 'down':
        pong.movePlayerDown(playerId);
        break;
    }
  }

  public stopPlayer = (params: IActionParams) => {
    const pong = <Pong> this.model.pong;
    pong.stopPlayer(<number>params.player);
  }
}
