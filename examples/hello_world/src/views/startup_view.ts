import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';

/**
 * Startup View
 */
export class StartupView extends View {
  public create(_componentAdder: ViewComponentAdder) {
    this.game.add.text(100,
                       100,
                       'Hello World!',
                       { fill: '#fff' });
  }

  public refresh() {
    //empty
  }

  public update() {
    //empty
  }
}
