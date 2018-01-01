import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
import { Scoreboard } from './components/scoreboard';
import { Pong } from '../models/pong';
/**
 * Field View
 */
export class FieldView extends View {
  private scorePlayer1: number;
  private scorePlayer2: number;
  
  private scoreboard: Scoreboard;
  private ball: Phaser.Graphics;
  private lastBallPosition: number[] = [0, 0];

  public create(componentAdder: ViewComponentAdder) {
    const bounds = (<Pong>this.model.pong).bounds;
    this.scoreboard = componentAdder.addComponent(new Scoreboard(bounds));
    this.createNet();
    this.createBall();
  }

  public update() {
    const score = (<Pong>this.model.pong).score;
    if (score.player1 != this.scorePlayer1) {
      this.scorePlayer1 = score.player1;
      this.scoreboard.scorePlayer1 = this.scorePlayer1;
    }

    if (score.player2 != this.scorePlayer2) {
      this.scorePlayer2 = score.player2;
      this.scoreboard.scorePlayer2 = this.scorePlayer2;
    }

    this.updateBall();
  }

  private createBall(){
    this.ball = this.game.add.graphics(0,0);
    this.updateBall();
  }

  private updateBall(){
    const ballModel = (<Pong>this.model.pong).ball;
    if (this.lastBallPosition[0] != ballModel.posX || this.lastBallPosition[1] != ballModel.posY) {
      this.lastBallPosition = [ballModel.posX, ballModel.posY];
      this.drawVerticalLine(this.ball, ballModel.posX, ballModel.posY, 10);
    }
  }

  private createNet(){
    const bounds = (<Pong>this.model.pong).bounds;
    for(let y = 0; y < bounds[1]; y += 40){
      this.drawVerticalLine(this.game.add.graphics(0,0), bounds[0] / 2, y, 20);
    }
  }

  private drawVerticalLine(line: Phaser.Graphics, origX: number, origY: number, length: number){
    line.clear();
    line.lineStyle(10, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }
}
