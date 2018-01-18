import { Bootstrap, View, ViewComponentAdder, WatchFactory  } from 'phaser-mvc';
import { Pong } from '../models/pong';
import { Ball } from '../models/ball';
import { Score } from '../models/score';
import { Scoreboard } from './components/scoreboard';

const pongWav = require('../assets/audios/pong.wav');
const failWav = require('../assets/audios/fail.wav');

Bootstrap.preload((game: Phaser.Game) => {
  game.load.audio('pongWav', pongWav);
  game.load.audio('failWav', failWav);
});

/**
 * Field View
 */
export class FieldView extends View {
  private scorePlayer1: number;
  private scorePlayer2: number;
  private scoreboard: Scoreboard;
  private ball: Phaser.Graphics;
  private lastBallPosition: number[] = [0, 0];
  private pongEffect: Phaser.Sound;
  private failEffect: Phaser.Sound;
  private lastSpeed: number;
  private lastSlope: number;

  public create(componentAdder: ViewComponentAdder) {
    const bounds = (<Pong>this.model.pong).bounds;
    this.scoreboard = componentAdder.addComponent(new Scoreboard(bounds));
    this.createNet();
    this.ball = this.game.add.graphics(0, 0);
    this.pongEffect = this.game.add.audio('pongWav');
    this.failEffect = this.game.add.audio('failWav');
  }

  public updateOnModelChange(watchFactory: WatchFactory){
    const pong = <Pong>this.model.pong;
    watchFactory.create<[number, number]>(() => [pong.ball.posX, pong.ball.posY]).subscribe(this.updateBall);
    watchFactory.create<Score>(() => (<Pong>this.model.pong).score).subscribe(this.updateScore);
    watchFactory.create<[number, number]>(() => [pong.ball.slope, pong.ball.speed]).subscribe(this.bounceBall);
  }

  private bounceBall = (_slopeSpeed: [number, number]) => {
    this.pongEffect.play();
  }

  private updateScore = (score: Score) => {
    this.failEffect.play();
    this.scoreboard.scorePlayer1 = score.player1;
    this.scoreboard.scorePlayer2 = score.player2;
  }

  private updateBall = (pos: [number, number]) => {
    this.drawVerticalLine(this.ball, pos[0], pos[1], 10);
  }

  private createNet() {
    const bounds = (<Pong>this.model.pong).bounds;
    for (let y = 0; y < bounds[1]; y += 40) {
      this.drawVerticalLine(this.game.add.graphics(0, 0), bounds[0] / 2, y, 20);
    }
  }

  private drawVerticalLine(line: Phaser.Graphics, origX: number, origY: number, length: number) {
    line.clear();
    line.lineStyle(10, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }
}
