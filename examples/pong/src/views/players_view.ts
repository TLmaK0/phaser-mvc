import { View, ViewComponentAdder, ExecuteOnModelChange } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { Player } from '../models/player';

/**
 * Players View
 */
export class PlayersView extends View {
  private players: Phaser.Graphics[] = [];

  public create(_componentAdder: ViewComponentAdder) {
    this.players.push(this.game.add.graphics(0, 0));
    this.players.push(this.game.add.graphics(0, 0));
  }

  public updateOnModelChange(onChange: ExecuteOnModelChange){
    onChange((model) => (<Pong>model.pong).players[0].posY, (_model) => 0, this.movePlayer);
    onChange((model) => (<Pong>model.pong).players[1].posY, (_model) => 1, this.movePlayer);
  }

  public update(){
  }

  private movePlayer = (playerId: number) => {
    const players = (<Pong>this.model.pong).players;
    this.moveLine(this.players[playerId], players[playerId].posX, players[playerId].posY, players[playerId].height);
  }

  private moveLine(line: Phaser.Graphics, origX: number, origY: number, length: number) {
    line.clear();
    line.lineStyle(20, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }
}
