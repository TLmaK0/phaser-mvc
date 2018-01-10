import { Cannon } from '../models/cannon';
import { Human } from '../models/human';

export class Circus {
  public cannon: Cannon = new Cannon(new Human());
}
