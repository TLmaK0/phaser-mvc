import { WatchModel } from './watch_model';
import { Observable, Observer } from '@reactivex/rxjs';
import * as _ from 'lodash';

export class WatchFactory {
  public watchsModel: WatchModel<any>[] = [];

  constructor(){
  }

  public create<T>(getModel: () => T): Observable<T> {
    const watchModel = new WatchModel<T>();

    watchModel.observable = Observable.create(
      (observer: Observer<() => T>) => watchModel.observer = observer
    ).map(
      (model: T) => _.cloneDeep(model)
    ).distinctUntilChanged(
      (prev: T, next: T) => _.isEqual(prev, next)
    );

    watchModel.getModel = getModel;

    this.watchsModel.push(watchModel); 

    return watchModel.observable;
  }
}
