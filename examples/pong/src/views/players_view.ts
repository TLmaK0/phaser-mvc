import { View, ViewComponentAdder, WatchFactory } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { Player } from '../models/player';

import * as _ from 'lodash';

/**
 * Players View
 */
export class PlayersView extends View {
  private players: Phaser.Graphics[] = [];
  public pong: Pong;

  public create(_componentAdder: ViewComponentAdder) {
    this.players.push(this.game.add.graphics(0, 0));
    this.players.push(this.game.add.graphics(0, 0));
  }

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<Player[]>(() => this.pong.players).subscribe(this.movePlayers);
  }

  public update(){
  }

  private movePlayers = (players: Player[]) => {
    this.moveLine(this.players[0], players[0].posX, players[0].posY, players[0].height);
    this.moveLine(this.players[1], players[1].posX, players[1].posY, players[1].height);
  }

  private moveLine(line: Phaser.Graphics, origX: number, origY: number, length: number) {
    line.clear();
    line.lineStyle(20, 0xffffff);
    line.moveTo(origX, origY);
    line.lineTo(origX, origY + length);
    line.endFill();
  }
}
