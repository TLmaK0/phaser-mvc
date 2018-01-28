import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';

export class Circus {
  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  constructor(){
    this.human = new Human();
    this.cannon = new Cannon();

    this.cannon.x = 100;
    this.cannon.y = 650;

    this.cannon.insertHuman(this.human);

    this.trampoline = new Trampoline();
    this.trampoline.x = 300;
    this.trampoline.y = 650;
  }
}
