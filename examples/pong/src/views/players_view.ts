import { View, ViewComponentAdder } from 'phaser-mvc';
import { Pong } from '../models/pong';

/**
 * Players View
 */
export class PlayersView extends View {
  playerLength: number = 100;
  playersXpos: number[] = [100, 950];
  playersYpos: number[] = [0,0];

  players: Phaser.Graphics[] = [];

  public create(_componentAdder: ViewComponentAdder) {
    this.players.push(this.drawPlayer(0, 500));
    this.players.push(this.drawPlayer(1, 500));
  }

  public update(){
    this.updatePlayerPositionIfRequired(0);
    this.updatePlayerPositionIfRequired(1);
  }

  private updatePlayerPositionIfRequired(playerNumber: number){
    const players = (<Pong>this.model.pong).players;
    if (this.playersYpos[playerNumber] != players[playerNumber].pos) {
      this.playersYpos[playerNumber] = players[playerNumber].pos;
      this.moveLine(this.players[playerNumber], this.playersXpos[playerNumber], this.playersYpos[playerNumber], this.playerLength);
    }
  }

  private drawPlayer(player: number, pos: number){
    return this.drawVerticalLine(this.playersXpos[player], pos, this.playerLength);
  }

  private moveLine(line: Phaser.Graphics, origX: number, origY: number, length: number){
    line.clear();
    line.lineStyle(20, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }

  private drawVerticalLine(origX: number, origY: number, length: number){
    const line = this.game.add.graphics(0,0);
    this.moveLine(line, origX, origY, length);
    return line;
  }
}

