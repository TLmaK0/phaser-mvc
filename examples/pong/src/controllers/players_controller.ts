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
    this.playersKeyboardView.onMovePlayer.subscribe(this.movePlayer);
    this.playersKeyboardView.onStopPlayer.subscribe(this.stopPlayer);

    this.playersView.show();
    this.playersKeyboardView.show();
  }

  public movePlayer = (move: [number, string]) => {
    switch (move[0]) {
      case 'up':
        this.pong.movePlayerUp(move[1]);
        break;
      case 'down':
        this.pong.movePlayerDown(move[1]);
        break;
      default:
        break;
    }
  }

  public stopPlayer = (playerId: number) => {
    this.pong.stopPlayer(playerId);
  }
}
