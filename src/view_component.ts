import { Bootstrap } from './bootstrap';
import { View } from './view';
import { ViewComponentAdder } from './view_component_adder';

/**
 * Component to be showed in view
 */
export abstract class ViewComponent {
  public view: View;
  protected components: ViewComponent[] = [];

  public static preload(preload: (game: Phaser.Game) => void) {
    Bootstrap.preloadComponent(preload);
  }

  public create(_componentAdder: ViewComponentAdder): void {
    //empty, can be overrided or not
  }

  public update(): void {
    //empty, can be overrided or not
  }

  public createComponent(componentAdder: ViewComponentAdder): void {
    this.create(componentAdder);
    for (const component of this.components) {
      component.createComponent(componentAdder);
    }
  }

  public updateComponent(): void {
    this.update();
    for (const component of this.components) {
      component.updateComponent();
    }
  }

  protected get game(): Phaser.Game {
    return this.view.controller.game;
  }
}
