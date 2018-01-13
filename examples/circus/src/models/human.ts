import { Body } from 'phaser-mvc';

@Body
export class Human {
  physics: any = {
    material: {
      restitution: 0;
    }
  }

  public x: number;
  public y: number;
}
