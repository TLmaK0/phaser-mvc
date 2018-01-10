import { Human } from './human';

export class Cannon {
  public x: number = 100;
  public y: number = 100;
  public angle: number = 45;

  private cannonUpdateTimer: NodeJS.Timer;

  constructor(public human: Human){
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
    console.log('launch....');
  }

  private rotate(angle: number) {
    this.angle = (this.angle + angle) % 360;
  }
}
