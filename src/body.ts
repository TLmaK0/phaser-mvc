/**
 * Body decorator
 *
 * @Body
 * class Ball {
 * }
 *
 * will add x and y, and will be updated by game world
 */

import { Bootstrap } from './bootstrap';

export function Body<T extends {new(...args:any[]):{}}>(target:T) {
  Object.defineProperty(target.prototype, 'x', {
    get (this: any) {
      return this._body.x;
    },
    enumerable: false,
    configurable: true
  });

  Object.defineProperty(target.prototype, 'y', {
    get (this: any) {
      return this._body.y;
    },
    enumerable: false,
    configurable: true
  });

  return class extends target {
    _body: Phaser.Physics.P2.Body;
    constructor(...args:any[]){
      super(args);
      Bootstrap.onInit.subscribe((bootstrap: Bootstrap) => {
        this._body = bootstrap.createBody((<any>this)['physics']);
      });
    }
  }
}
