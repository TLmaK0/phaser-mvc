import { IViewMap, IActionParams, Controller } from 'phaser-mvc';
import { FieldView } from '../views/field_view';
import { Score } from '../models/score';

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

  public prepareField = (params: IActionParams) => {
    this.model.score = params.score;
    this.render(this.views.field);
  }
}
