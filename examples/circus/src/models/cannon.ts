import { Human } from './human';

export class Cannon {
  public x: number;
  public y: number;
  public angle: number = -45;

  private cannonUpdateTimer: NodeJS.Timer;

  private _human: Human;
  private _humanLaunched: boolean = false;

  public insertHuman(human: Human){
    human.x = this.x - 33;
    human.y = this.y;
    human.angle = this.angle;
    this._human = human;
  }

  public get human() {
    return this._human;
  }

  public hasHuman() {
    return !!this._human;
  }

  public rotateClockwise() {
    this.rotateStop();
    this.rotate(-1);
    this.cannonUpdateTimer = setTimeout(this.rotateClockwise.bind(this), 10);
  }

  public rotateCounterclockwise() {
    this.rotateStop();
    this.rotate(1);
    this.cannonUpdateTimer = setTimeout(this.rotateCounterclockwise.bind(this), 10);
  }

  public rotateStop() {
    clearTimeout(this.cannonUpdateTimer);
  }

  public launchHuman(){
    if (!this._human) return;
    const angle =  this.angle * (Math.PI / 180);
    this._human.velocity.x = Math.cos(angle) * 300;
    this._human.velocity.y = Math.sin(angle) * 300;
    this._human = null;
  }

  private rotate(angle: number) {
    this.angle = (this.angle + angle) % 360;
  }
}
