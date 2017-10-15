import * as Phaser from 'phaser-ce';

import { Controller } from 'controller';
import { IActionParams } from 'i_action_params';
import { IModel } from 'i_model';
import { ViewComponent } from 'view_component';
import { ViewComponentAdder } from 'view_component_adder';

/**
 * Input and ouput for the application
 */
export abstract class View {
  public controller: Controller;
  protected components: ViewComponent[] = [];
  protected initiated: boolean = false;

  public refresh() {
    //empty, can be overrided or not
  }
  public create(_componentAdder: ViewComponentAdder) {
    //empty, can be overrided or not
  }
  public preload() {
    //empty, can be overrided or not
  }
  public update() {
    //empty, can be overrided or not
  }

  public init(controller: Controller) {
    if (!this.initiated) {
      this.controller = controller;
      this.createView();
      this.initiated = true;
    }
  }

  get game(): Phaser.Game {
    return this.controller.game;
  }

  get model(): IModel {
    return this.controller.model;
  }

  public createView() {
    const componentAdder = new ViewComponentAdder(this, this.components);
    this.create(componentAdder);
  }

  public updateView() {
    if (!this.initiated) return;
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  public refreshView() {
    if (!this.initiated) throw EvalError('View is not rendered please render it before refresh.');
    this.refresh();
  }

  protected goTo(controllerName: string, controllerAction: string, params: IActionParams): void {
    this.controller.goTo(controllerName, controllerAction, params);
  }
}
