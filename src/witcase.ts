/**
 */
import { Controller } from './controller';
import { BaseEngine } from './base_engine';
import { View } from './view';
import { Guid } from './guid';

export class Witcase<T> implements BaseEngine {
  public engine: T;

  public defaultAction: () => void;

  public static current: any;

  private views: View<T>[] = [];

  private constructor(){
  }

  public static create<T>(){
    Witcase.current = new Witcase<T>();
    return Witcase.current;
  }

  public start(engineStarter: (baseEngine: BaseEngine) => T): void {
    this.engine = engineStarter(this);
  }

  public create = (): void => {
    this.defaultAction();
  }

  public preload = (): void => {
    for (const view of this.views){
      view.preloadView();
    }
  }

  public update = (): void => {
    for (const view of this.views){
      view.updateView();
    }
  }

  public render = (): void => {
    for (const view of this.views){
      view.renderView();
    }
  }

  public registerView(view: View<T>){
    this.views.push(view);
  }
}
