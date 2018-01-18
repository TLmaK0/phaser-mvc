import { PhysicBody } from 'phaser-mvc';

export class Trampoline extends PhysicBody {
  protected physics: any = {
    material: {
      restitution: 0.8
    }
  };

  public createBody(body: Phaser.Physics.P2.Body){
    body.addRectangle(210, 10, 110, 30, 0);
  }
}
