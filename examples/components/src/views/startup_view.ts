import { View, ViewComponentAdder } from 'phaser-mvc';
import { Dialog } from './components/dialog';

/**
 * Startup View
 */
export class StartupView extends View<Phaser.Game> {
  private dialog: Dialog;
  public dialogMessage: string;

  public preload(componentAdder: ViewComponentAdder<Phaser.Game>) {
    this.dialog = new Dialog(this.dialogMessage);
    componentAdder.addComponent(this.dialog);
  }

  public create() {
    this.dialog.open();
  }
}
