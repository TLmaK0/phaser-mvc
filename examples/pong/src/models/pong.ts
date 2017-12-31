import { Score } from './score';
import { Player } from './player';

export class Pong {
  players: Player[] = [new Player(), new Player()];
  score: Score = new Score();
  timeouts: number[] = [-1, -1];

  public movePlayerUp(playerId: number){
    this.stopPlayer(playerId);
    this._movePlayer(playerId, -10);
  }

  public movePlayerDown(playerId: number){
    this.stopPlayer(playerId);
    this._movePlayer(playerId, 10);
  }

  public stopPlayer(playerId: number){
    clearTimeout(this.timeouts[playerId]);
  }

  private _movePlayer(playerId: number, step: number){
    this.players[playerId].pos += step;
    this.timeouts[playerId] = setTimeout(() => {
      this._movePlayer(playerId, step);
    }, 10);
  }
}
