import { Controller } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { PlayersKeyboardView } from '../views/players_keyboard_view';
import { PlayersView } from '../views/players_view';

export class PlayersController extends Controller {
  playersView: PlayersView = new PlayersView();
  playersKeyboardView: PlayersKeyboardView = new PlayersKeyboardView();
  pong: Pong;

  public preparePlayers = (pong: Pong) => {
    this.pong = pong;
    this.playersView.pong = this.pong;
    this.playersKeyboardView.movePlayer = this.movePlayer;
    this.playersKeyboardView.stopPlayer = this.stopPlayer;

    this.playersView.show();
    this.playersKeyboardView.show();
  }

  public movePlayer = (playerId: number, direction: string) => {
    switch (direction) {
      case 'up':
        this.pong.movePlayerUp(playerId);
        break;
      case 'down':
        this.pong.movePlayerDown(playerId);
        break;
      default:
        break;
    }
  }

  public stopPlayer = (playerId: number) => {
    this.pong.stopPlayer(playerId);
  }
}
