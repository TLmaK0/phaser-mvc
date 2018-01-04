import { Observable, Observer } from '@reactivex/rxjs';

export type GetModel = (model: any) => any;

export class ModelWatch {
  observable: Observable<any>;
  observer: Observer<GetModel>;
  getModel: GetModel;
}
