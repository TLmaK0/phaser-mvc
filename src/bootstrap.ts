/**
 */

import * as Phaser from 'phaser-ce';

import { Controller } from './controller';
import { IActionParams } from './i_action_params';
import { IControllerMap } from './i_controller_map';
import { AsyncSubject } from '@reactivex/rxjs';

/** Bootstrap for the phaser-mvc.
 * Useage:
 * import { FrameController } from 'phaser-mvc';
 * import { LandEditorController } from 'phaser-mvc';
 * window.onload = () => {
 * const boot = new Bootstrap();
 * boot.addController('FrameController', FrameController);
 */

export class Bootstrap {
  private static preloadComponents: ((game: Phaser.Game) => void)[] = [];

  public game: Phaser.Game;
  protected controllers: IControllerMap = {};
  private startAction: [string, string, IActionParams];

  public static onInit: AsyncSubject<Bootstrap> = new AsyncSubject<Bootstrap>();

  public constructor(public width: number = 1920, public height: number = 1080){
  }

  public static preload(preload: (game: Phaser.Game) => void): void {
    Bootstrap.preloadComponents.push(preload);
  }

  public start(controllerName: string, controllerAction: string, params: IActionParams): void {
    this.startAction = [controllerName, controllerAction, params];
    this.game = new Phaser.Game(
      this.width,
      this.height,
      Phaser.CANVAS,
      'content',
      { preload: this.preload,
        create: this.create,
        update: this.update});
  }

  public preload = (): void => {
    for (const preload of Bootstrap.preloadComponents) {
      preload(this.game);
    }
  }

  public create = (): void => {
    this.worldCustomizations();

    Bootstrap.onInit.next(this);
    Bootstrap.onInit.complete();

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.goTo(this.startAction[0], this.startAction[1], this.startAction[2]);
  }

  private worldMaterial: Phaser.Physics.P2.Material;
  private worldCustomizations(){
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
this.game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
    this.game.physics.p2.gravity.y = 100;
    this.game.physics.p2.restitution = 0.8;
  }

  public createBody(physics: any){
    const body = new Phaser.Physics.P2.Body(this.game, this.game.add.sprite(0,0, null), 0, 0);
    var material = this.game.physics.p2.createMaterial('humanMaterial', body);
    var contactMaterial = this.game.physics.p2.createContactMaterial(material, this.worldMaterial);
    contactMaterial.restitution = physics['restitution'];
    return body;
  }

  public update = (): void => {
    for (const controllerName of Object.keys(this.controllers)) {
      this.updateController(<Controller>this.controllers[controllerName]);
    }
  }

  public addController<T extends Controller>(name: string, controllerType: new () => T): void {
    if (this.controllers[name] != null) throw EvalError(`Controller ${name} already registered.`);

    const controller: T = new controllerType();
    controller.bootstrap = this;
    this.controllers[name] = controller;
  }

  public goTo(controllerName: string, controllerAction: string, params: IActionParams): void {
    /*tslint:disable:no-any*/
    const controller: any = this.controllers[controllerName];
    /*tslint:enable:no-any*/
    if (!controller) {
      throw EvalError(`Controller ${controllerName} not exist. Be sure you load it in bootstrap.`);
    }
    /*tslint:disable:no-unsafe-any*/
    controller[controllerAction](params);
    /*tslint:enable:no-unsafe-any*/
  }

  private updateController(controller: Controller): void {
    for (const viewName of Object.keys(controller.views)) {
      controller.getView(viewName).updateView();
    }
  }
}
