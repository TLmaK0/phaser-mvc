import * as Phaser from 'phaser-ce';

import { Bootstrap } from './bootstrap';
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
  private watchFactory: WatchFactory = new WatchFactory();

  constructor(private bootstrap: Bootstrap = Bootstrap.instance){
    bootstrap.registerView(this);
  }

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

  public show() {
    this.createView();
  }

  get game(): Phaser.Game { return this.bootstrap.game; }

  private createView() {
    const componentAdder = new ViewComponentAdder(this.components, this);
    this.create(componentAdder);
    this.updateOnModelChange(this.watchFactory);
  }

  public updateView() {
    this.checkWatchModels();
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  public updateOnModelChange(_watchFactory: WatchFactory){
    //this should be overrided or not
  }

  private checkWatchModels(){
    for(const watchModel of this.watchFactory.watchsModel){
      watchModel.observer.next(watchModel.getModel());
    }
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
