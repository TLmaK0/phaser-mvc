import { ViewComponent, ViewComponentAdder } from 'phaser-mvc';
import { ScoreNumber } from './score_number';

export class Scoreboard extends ViewComponent {
  _scorePlayer1: ScoreNumber;
  _scorePlayer2: ScoreNumber;

  public constructor(private bounds: number[]){
    super();
  }

  public create(componentAdder: ViewComponentAdder) {
    this._scorePlayer1 = componentAdder.addComponent(new ScoreNumber(300, 50)); 
    this._scorePlayer2 = componentAdder.addComponent(new ScoreNumber(this.bounds[0] - 400, 50)); 
  }

  public set scorePlayer1(value: number){
    this._scorePlayer1.value = value;
  }

  public set scorePlayer2(value: number){
    this._scorePlayer2.value = value;
  }

  public get scorePlayer1(){
    return this._scorePlayer1.value;
  }

  public get scorePlayer2(){
    return this._scorePlayer2.value;
  }
}
