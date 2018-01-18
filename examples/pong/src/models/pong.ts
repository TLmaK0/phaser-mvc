import { Ball } from './ball';
import { Player } from './player';
import { Score } from './score';

export class Pong {
  players: Player[];
  score: Score = new Score();
  ball: Ball = new Ball();
  playersTimeout: NodeJS.Timer[] = [];
  ballTimeout: NodeJS.Timer;
  bounds: number[];
  step: number = 10;

  public constructor() {
    this.bounds = [1000, 700];
    this.players = [new Player({ posX: 100, posY: 350}),
                    new Player({ posX: 900, posY: 350})];
  }

  public startGame() {
    this.launchBall();
  }

  public movePlayerUp(playerId: number) {
    this.stopPlayer(playerId);
    this._movePlayer(playerId, -this.step);
  }

  public movePlayerDown(playerId: number) {
    this.stopPlayer(playerId);
    this._movePlayer(playerId, this.step);
  }

  public stopPlayer(playerId: number) {
    clearTimeout(this.playersTimeout[playerId]);
  }

  private _movePlayer(playerId: number, step: number) {
    this.players[playerId].posY += step;
    this.playersTimeout[playerId] = setTimeout(() => {
      this._movePlayer(playerId, step);
    },10);
  }

  private launchBall() {
    this.ball.slope = this.generateSlope();
    this.ball.speed = this.generateSpeed();
    this.ball.posX = 500;
    this.ball.posY = 500;
    this.moveBall();
  }

  private generateSpeed() {
    let speed = 0;
    while (speed === 0) {
      speed = Math.floor(Math.random() * 2);
    }
    if(Math.floor(Math.random() * 2) === 0) speed = -speed;
    return speed;
  }

  private generateSlope() {
    let slope = 0;
    while (slope === 0) {
      slope = Math.floor(Math.random() * 6) - 3;
    }
    return slope;
  }

  private ballOutOfBounds() {
    return this.ball.posX <= 0 || this.ball.posX >= this.bounds[0];
  }
  private moveBall() {
    if (this.ballOutOfBounds()) {
      clearTimeout(this.ballTimeout);
      this.ballOut();
      return;
    }

    this.checkCollisions();

    this.ball.posX += this.step * this.ball.speed;
    this.ball.posY += this.step * this.ball.slope;
    this.ballTimeout = setTimeout(() => {
      this.moveBall();
    }, 50);
  }

  private checkCollisions(){
    if (this.ball.posY <= 0 || this.ball.posY >= this.bounds[1]) {
      this.ball.slope = -this.ball.slope; 
    }
    if (this.isPlayerCollision(0) || this.isPlayerCollision(1)) {
      this.ball.speed = -this.ball.speed;
    }
  }

  private isPlayerCollision(playerId: number) {
    const player = this.players[playerId];
    const wallPosition = playerId === 0 ? -this.step : this.step;
    return this.ball.posX + wallPosition === player.posX &&
           this.ball.posY >= player.posY &&
           this.ball.posY <= player.posY + player.height;
  }
  private ballOut() {
    if (this.ball.posX <= 0) this.score.player2++;
    else this.score.player1++;
    if (this.score.player1 === 10) this.score.player1 = 0;
    if (this.score.player2 === 10) this.score.player2 = 0;
    this.launchBall();
  }
}
