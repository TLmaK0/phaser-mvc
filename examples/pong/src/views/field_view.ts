import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
import { Scoreboard } from './components/scoreboard';
import { Score } from '../models/score';
/**
 * Field View
 */
export class FieldView extends View {
  private scorePlayer1: number;
  private scorePlayer2: number;
  
  private scoreboard: Scoreboard;

  public create(componentAdder: ViewComponentAdder) {
    this.scoreboard = componentAdder.addComponent(new Scoreboard());
    this.createNet();
  }

  public update() {
    const score = <Score>this.model.score;
    if (score.player1 != this.scorePlayer1) {
      this.scorePlayer1 = score.player1;
      this.scoreboard.scorePlayer1 = this.scorePlayer1;
    }

    if (score.player2 != this.scorePlayer2) {
      this.scorePlayer2 = score.player2;
      this.scoreboard.scorePlayer2 = this.scorePlayer2;
    }
  }

  private createNet(){
    for(let y = 0; y < 800; y += 40){
      this.drawVerticalLine(500, y, 20);
    }
  }

  private drawVerticalLine(origX: number, origY: number, length: number){
    const line = this.game.add.graphics(0,0);
    line.clear();
    line.lineStyle(20, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }
}
