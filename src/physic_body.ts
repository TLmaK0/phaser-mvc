/**
 */

import { Bootstrap } from './bootstrap';

export class PhysicBody {
  private body: Phaser.Physics.P2.Body;
  private _x: number = 0;
  private _y: number = 0;
  private _angle: number = 0;

  private getX = () => this._x;
  private getY = () => this._y;
  private getAngle = () => this._angle;

  private setX = (value: number) => this._x = value;
  private setY = (value: number) => this._y = value;
  private setAngle = (value: number) => this._angle = value;

  protected physics: any = {};

  constructor(){
    Bootstrap.onInit.subscribe(this.onBootstrapInit.bind(this));
  }

  protected onBootstrapInit(bootstrap: Bootstrap){
    this.body = bootstrap.createBody(this);

    this.getX = () => this.body.x;
    this.getY = () => this.body.y;
    this.getAngle = () => this.body.angle;

    this.setX = (value: number) => this.body.x = value;
    this.setY = (value: number) => this.body.y = value;
    this.setAngle = (value: number) => this.body.angle = value;
  }

  public getPhysicsConfiguration(): any{
    return this.physics;
  }

  public get angle(): number{
    return this.getAngle();
  }

  public set angle(value: number){
    this.setAngle(value);
  }

  public get x(): number{
    return this.getX();
  }

  public set x(value: number){
    this.setX(value);
  }

  public get y(): number{
    return this.getY();
  }

  public set y(value: number){
    this.setY(value);
  }
}
