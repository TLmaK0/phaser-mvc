import { PhysicBody } from 'phaser-mvc';

export class Human extends PhysicBody{
  public velocity: [number, number] = [0, 0];

  protected physics: any = {
    material: {
      restitution: 0
    }
  };

  public createBody(body: Phaser.Physics.P2.Body){
    body.addCircle(25, 90, 25);
    body.addRectangle(75, 30, 35, 30, 0);
  }
}
