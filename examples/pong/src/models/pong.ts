import { Score } from './score';
import { Player } from './player';

export class Pong {
  players: Player[] = [new Player(), new Player()];
  score: Score = new Score();
}
