import { View } from 'view';
import { ViewComponent } from 'view_component';

/**
 * Adds a component to the view
 */
export class ViewComponentAdder {
  constructor(private view: View, private components: ViewComponent[]) {}

  public addComponent<T extends ViewComponent>(component: T): T {
    component.view = this.view;
    this.components.push(component);
    component.createComponent(this);

    return component;
  }
}
