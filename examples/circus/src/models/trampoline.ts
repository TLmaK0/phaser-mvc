import { PhysicBody } from 'phaser-mvc';

export class Trampoline extends PhysicBody {
  protected physics: any = {
    material: {
      restitution: 0.8
    }
  };

  public createBody(body: Phaser.Physics.P2.Body){
    body.clearShapes();
    body.addRectangle(200, 10, 105, -30, 0);
  }
}
