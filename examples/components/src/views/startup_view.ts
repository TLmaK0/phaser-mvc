import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
import { Dialog } from './components/dialog';

/**
 * Startup View
 */
export class StartupView extends View {
  private dialog: Dialog;
  public dialogMessage: string;

  public create(componentAdder: ViewComponentAdder) {
    this.dialog = new Dialog(this.dialogMessage);
    componentAdder.addComponent(this.dialog);

    this.dialog.open();
  }
}
