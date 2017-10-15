/* tslint:disable */
import 'p2';
import 'pixi';
import 'phaser';
/* tslint:enable */
import * as Phaser from 'phaser-ce';

import { Controller } from 'controller';
import { IActionParams } from 'i_action_params';
import { IControllerMap } from 'i_controller_map';

/** Bootstrap for the phaser-mvc.
 * Useage:
 * import { FrameController } from './controllers/frame_controller';
 * import { LandEditorController } from './controllers/admin/land_editor_controller';
 * window.onload = () => {
 * const boot = new Bootstrap();
 * boot.addController('FrameController', FrameController);
 */

export class Bootstrap {

  public static readonly WIDTH: number = 1920;
  public static readonly HEIGHT: number = 1080;
  private static preloadComponents: ((game: Phaser.Game) => void)[] = [];

  public game: Phaser.Game;
  protected controllers: IControllerMap = {};
  private startAction: [string, string, IActionParams];

  public static preloadComponent(preload: (game: Phaser.Game) => void): void {
    Bootstrap.preloadComponents.push(preload);
  }

  public start(controllerName: string, controllerAction: string, params: IActionParams): void {
    this.startAction = [controllerName, controllerAction, params];
    this.game = new Phaser.Game(
      Bootstrap.WIDTH,
      Bootstrap.HEIGHT,
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
    this.goTo(this.startAction[0], this.startAction[1], this.startAction[2]);
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
