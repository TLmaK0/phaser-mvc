import { Controller } from 'phaser-mvc';
import { Circus } from '../models/circus';
import { CircusController } from './circus_controller';

import { Container, Inject } from 'typescript-ioc';
/**
 * Game controller
 */
export class GameController extends Controller {
  constructor(@Inject private circus: Circus,
              @Inject private circusController: CircusController){
    super();
  }

  public startGame = () => {
    this.circusController.prepareCannon(this.circus.cannon,
                                        this.circus.trampoline);
  }
}
