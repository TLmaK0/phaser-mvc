import { Score } from './score';
import { Player } from './player';

export class Pong {
  players: Player[] = [new Player(), new Player()];
  score: Score = new Score();

  public movePlayerUp(_playerId: number){
    console.log('move up');
  }

  public movePlayerDown(_playerId: number){
  }

  public stopPlayer(_playerId: number){
  }
}
