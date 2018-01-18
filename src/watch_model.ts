import { Observable, Observer } from '@reactivex/rxjs';

export class WatchModel<T> {
  observable: Observable<T>;
  observer: Observer<() => T>;
  getModel: () => T;
}
