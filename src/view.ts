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
    component.createComponent(this, this.view);

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

  public create(_componentAdder: ViewComponentAdder<T>) {
    //empty, can be overrided or not
  }
  public preload() {
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
    this.preload();
    for (const component of this.components) {
      component.preloadComponent();
    }
  }

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

  public renderView() {
    this.render();
    for (const component of this.components) {
      component.renderComponent();
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
export abstract class ViewComponent<T> {
  public view: View<T>;
  protected components: ViewComponent<T>[] = [];

  public preload(): void {
    //empty, can be overrided or not
  }

  public create(_componentAdder: ViewComponentAdder<T>): void {
    //empty, can be overrided or not
  }

  public update(): void {
    //empty, can be overrided or not
  }

  public render(): void {
    //empty, can be overrided or not
  }

  public preloadComponent(): void {
    this.preload();
    for (const component of this.components) {
      component.preloadComponent();
    }
  }

  public createComponent(componentAdder: ViewComponentAdder<T>, view: View<T>): void {
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
