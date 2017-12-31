import { IViewMap } from 'phaser-mvc';
import { Controller } from 'phaser-mvc';
import { FieldView } from '../views/field_view';

/**
 * Startup controller
 */
export class FieldController extends Controller {
  public views: IViewMap = {
    field: new FieldView()
  };

  constructor() {
    super();
  }

  public startGame = () => {
    this.render(this.views.field);
  }
}
