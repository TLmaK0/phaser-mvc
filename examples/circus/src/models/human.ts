import { PhysicBody } from 'phaser-mvc';

export class Human extends PhysicBody{
  public x: number = 100;
  public y: number = 100;

  protected physics: any = {
    material: {
      restitution: 0.8
    }
  };
}
