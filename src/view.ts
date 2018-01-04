import * as Phaser from 'phaser-ce';
import * as _ from 'lodash';
import { Observable, Observer } from '@reactivex/rxjs';

import { IActionParams } from './i_action_params';
import { IModel } from './i_model';
import { ModelWatch, GetModel } from './model_watch';

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

export type ExecuteOnModelChange = (getModel: GetModel, returnModel: GetModel, update: GetModel ) => void;

/**
 * Input and ouput for the application
 */
export abstract class View {
  protected components: ViewComponent[] = [];
  protected initiated: boolean = false;
  private _game: Phaser.Game;
  private _model: IModel;
  private _goTo: (controllerName: string, controllerAction: string, params: IActionParams) => void;

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
    this.updateOnModelChange(this.execOnUpdated);
  }

  public updateView() {
    if (!this.initiated) return;
    this.checkModelWatchs();
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  public refreshView() {
    if (!this.initiated) throw EvalError('View is not rendered please render it before refresh.');
    this.refresh();
  }

  public updateOnModelChange(_onChange: ExecuteOnModelChange){
    //this should be overrided or not
  }

  private modelWatchs: ModelWatch[] = [];

  private execOnUpdated = (getModel: GetModel, returnModel: GetModel, update: GetModel ) => {
    const modelWatch = new ModelWatch();

    modelWatch.observable = Observable.create(
      (observer: Observer<GetModel>) => modelWatch.observer = observer
    ).distinctUntilChanged(
      (prev: any, next: any) => _.isEqual(prev, next)
    ).map((model: any) => {
      let model = returnModel(model);
      return model;
    });

    modelWatch.getModel = getModel;
    modelWatch.observable.subscribe(update);
    this.modelWatchs.push(modelWatch); 
  }

  private checkModelWatchs(){
    for(const modelWatch of this.modelWatchs){
      modelWatch.observer.next(modelWatch.getModel(this.model));
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
