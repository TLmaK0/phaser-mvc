import * as Phaser from 'phaser-ce';

import { IActionParams } from './i_action_params';
import { IModel } from './i_model';
import { WatchModel } from './watch_model';
import { WatchFactory } from './watch_factory';

/**
 * Adds a component to the view and other view components
 */
export class ViewComponentAdder {
  constructor(private components: ViewComponent[], private view: View) {}

  public addComponent<T extends ViewComponent>(component: T): T {
    this.components.push(component);
    component.createComponent(this, this.view);

    return component;
  }
}

/**
 * Input and ouput for the application
 */
export abstract class View {
  protected components: ViewComponent[] = [];
  protected initiated: boolean = false;
  private _game: Phaser.Game;
  private _model: IModel;
  private _goTo: (controllerName: string, controllerAction: string, params: IActionParams) => void;
  private watchFactory: WatchFactory = new WatchFactory();

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

  public init(game: Phaser.Game, model: IModel, goTo: (controllerName: string, controllerAction: string, params: IActionParams) => void) {
    if (!this.initiated) {
      this._game = game;
      this._model = model;
      this._goTo = goTo;
      this.createView();
      this.initiated = true;
    }
  }

  get game(): Phaser.Game { return this._game; }

  get model(): IModel { return this._model; }

  public createView() {
    const componentAdder = new ViewComponentAdder(this.components, this);
    this.create(componentAdder);
    this.updateOnModelChange(this.watchFactory);
  }

  public updateView() {
    if (!this.initiated) return;
    this.checkWatchModels();
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  public refreshView() {
    if (!this.initiated) throw EvalError('View is not rendered please render it before refresh.');
    this.refresh();
  }

  public updateOnModelChange(_watchFactory: WatchFactory){
    //this should be overrided or not
  }

  private checkWatchModels(){
    for(const watchModel of this.watchFactory.watchsModel){
      watchModel.observer.next(watchModel.getModel());
    }
  }

  protected goTo(controllerName: string, controllerAction: string, params: IActionParams): void {
    this._goTo(controllerName, controllerAction, params);
  }
}

/**
 * Component to be showed in view
 */
export abstract class ViewComponent {
  public view: View;
  protected components: ViewComponent[] = [];

  public create(_componentAdder: ViewComponentAdder): void {
    //empty, can be overrided or not
  }

  public update(): void {
    //empty, can be overrided or not
  }

  public createComponent(componentAdder: ViewComponentAdder, view: View): void {
    this.view = view;
    this.create(componentAdder);
    for (const component of this.components) {
      component.createComponent(componentAdder, view);
    }
  }

  public updateComponent(): void {
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  protected get game(): Phaser.Game {
    return this.view.game;
  }
}
