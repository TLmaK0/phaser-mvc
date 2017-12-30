import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
import { Dialog } from './components/dialog';
/**
 * Startup View
 */
export class StartupView extends View {
  private dialog: Dialog;
  private currentText: string;

  public create(componentAdder: ViewComponentAdder) {
    this.dialog = new Dialog(this.model.dialogMessage, this.onCloseDialog);
    componentAdder.addComponent(this.dialog);

    this.dialog.open();
  }

  public refresh() {
    //empty
  }

  public update() {
    //empty
  }

  private onCloseDialog(){
    this.goTo('StartupController', 'createNewDialog', {});
  }
}
