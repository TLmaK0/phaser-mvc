import { View } from 'phaser-mvc';
import { Controller, ViewComponentAdder } from 'phaser-mvc';

/**
 * Startup View
 */
export class StartupView extends View {
  public welcomeMessage: string;

  public create(_componentAdder: ViewComponentAdder) {
    this.game.add.text(100,
                       100,
                       this.welcomeMessage,
                       { fill: '#fff' });
  }

  public refresh() {
    //empty
  }

  public update() {
    //empty
  }
}
