import { Observable, Observer, Subject } from '@reactivex/rxjs';

export class ViewNotifier<T> {
  private observable: Observable<T>;
  private subject: Subject<T>;

  constructor(){
    this.subject = new Subject<T>();
    this.observable = new Observable<T>().multicast(this.subject);
  }

  public subscribe(observer: (t: T) => void){
    this.observable.subscribe(observer);
  }

  public publish(value?: T){
    this.subject.next(value);
  }
}

