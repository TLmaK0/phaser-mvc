/**
 */

import { Bootstrap } from './bootstrap';
import { BodyProperty } from './body_property';

export abstract class PhysicBody {
  private body: Phaser.Physics.P2.Body;

  @BodyProperty
  public x: number = 0;

  @BodyProperty
  public y: number = 0;

  @BodyProperty
  public angle: number = 0;

  @BodyProperty
  public velocity: [number, number] = [0, 0];

  @BodyProperty
  public mass: number = 1;

  protected physics: any = {};

  constructor(){
    Bootstrap.onInit.subscribe(this.onBootstrapInit.bind(this));
  }

  public createBody(_body: Phaser.Physics.P2.Body){
  }

  protected onBootstrapInit(bootstrap: Bootstrap){
    this.body = bootstrap.createBody(this);

    const propertyClass = <any>this;

    for (const property of propertyClass['bodyProperties']){
      propertyClass['get' + property] = propertyClass['getBody' + property];
      propertyClass['set' + property] = propertyClass['setBody' + property];
    }

    this.createBody(this.body);
  }


  public getPhysicsConfiguration(): any{
    return this.physics;
  }
}
