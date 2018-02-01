import { Witcase } from './witcase';
import { WatchModel } from './watch_model';
import { WatchFactory } from './watch_factory';

/**
 * Adds a component to the view and other view components
 */
export class ViewComponentAdder<T> {
  constructor(private components: ViewComponent<T>[], private view: View<T>) {}

  public addComponent<S extends ViewComponent<T>>(component: S): S {
    this.components.push(component);
    component.preloadComponent(this, this.view);

    return component;
  }
}

/**
 * Input and ouput for the application
 */
export abstract class View<T> {
  protected components: ViewComponent<T>[] = [];
  private watchFactory: WatchFactory = new WatchFactory();

  //TODO: we should inject with typescript-ioc
  constructor(private witcase: Witcase<T> = Witcase.current){
    this.witcase.registerView(this);
  }

  public create() {
    //empty, can be overrided or not
  }
  public preload(_componentAdder: ViewComponentAdder<T>) {
    //empty, can be overrided or not
  }
  public update() {
    //empty, can be overrided or not
  }
  public render() {
    //empty, can be overrided or not
  }

  public show() {
    this.createView();
  }

  get engine(): T { return this.witcase.engine; }

  public preloadView() {
    const componentAdder = new ViewComponentAdder(this.components, this);
    for (const component of this.components) {
      component.preloadComponent(componentAdder, this);
    }
    this.preload(componentAdder);
  }

  private createView() {
    for (const component of this.components) {
      component.createComponent();
    }
    this.create();
    this.updateOnModelChange(this.watchFactory);
  }

  public updateView() {
    for (const component of this.components) {
      component.updateComponent();
    }
    this.checkWatchModels();
    this.update();
  }

  public renderView() {
    for (const component of this.components) {
      component.renderComponent();
    }
    this.render();
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
export abstract class ViewComponent<T> {
  public view: View<T>;
  protected components: ViewComponent<T>[] = [];

  public preload(_componentAdder: ViewComponentAdder<T>, _view: View<T>): void {
    //empty, can be overrided or not
  }

  public create(): void {
    //empty, can be overrided or not
  }

  public update(): void {
    //empty, can be overrided or not
  }

  public render(): void {
    //empty, can be overrided or not
  }

  public preloadComponent(componentAdder: ViewComponentAdder<T>, view: View<T>): void {
    this.view = view;
    this.preload(componentAdder, view);
    for (const component of this.components) {
      component.preloadComponent(componentAdder, view);
    }
  }

  public createComponent(): void {
    this.create();
    for (const component of this.components) {
      component.createComponent();
    }
  }

  public updateComponent(): void {
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  public renderComponent(): void {
    this.render();
    for (const component of this.components) {
      component.renderComponent();
    }
  }

  protected get engine(): T {
    return this.view.engine;
  }
}
