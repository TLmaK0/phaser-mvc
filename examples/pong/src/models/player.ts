export class Player {
  posX: number = 0;
  posY: number = 0;
  height: number = 100;

  public constructor(init?:Partial<Player>){
    (<any>Object).assign(this, init);
  }
}
