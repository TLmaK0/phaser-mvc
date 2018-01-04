export class Player {
  public posX: number = 0;
  public posY: number = 0;
  public height: number = 100;

  public constructor(init?: Partial<Player>) {
    (<any>Object).assign(this, init);
  }
}
