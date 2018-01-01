import { View, ViewComponentAdder } from 'phaser-mvc';
import { Pong } from '../models/pong';

/**
 * Players View
 */
export class PlayersView extends View {
  playersYpos: number[] = [0, 0];

  players: Phaser.Graphics[] = [];

  public create(_componentAdder: ViewComponentAdder) {
    this.players.push(this.game.add.graphics(0,0));
    this.players.push(this.game.add.graphics(0,0));
  }

  public update(){
    this.updatePlayerPositionIfRequired(0);
    this.updatePlayerPositionIfRequired(1);
  }

  private updatePlayerPositionIfRequired(playerId: number){
    const players = (<Pong>this.model.pong).players;
    if (this.playersYpos[playerId] != players[playerId].posY) {
      this.playersYpos[playerId] = players[playerId].posY;
      this.moveLine(this.players[playerId], players[playerId].posX, this.playersYpos[playerId], players[playerId].height);
    }
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
}

