import { Observable, Observer, Subject } from '@reactivex/rxjs';
import { View, ViewComponentAdder, WatchFactory } from 'phaser-mvc';

/**
 * Players Keys View
 */

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

export class PlayerKeysView extends View {
  rotateCannon: ViewNotifier<string> = new ViewNotifier<string>();
  rotateCannonStop: ViewNotifier<void> = new ViewNotifier<void>();
  launchHuman: ViewNotifier<void> = new ViewNotifier<void>();

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<[boolean, boolean]>(() => [
      this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT),
      this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
    ]).subscribe(this.moveCannon);

    watchFactory.create<boolean>(() => this.game.input.keyboard.isDown(
      Phaser.Keyboard.SPACEBAR
    )).subscribe(this.launchHumanNow);
  }

  private moveCannon = (areKeysDown: [boolean, boolean]) => {
    if (areKeysDown[0]) this.rotateCannon.publish('clockwise');
    else if (areKeysDown[1]) this.rotateCannon.publish('counter-clockwise');
    else this.rotateCannonStop.publish();
  }

  private launchHumanNow = (launchHuman: boolean) => {
    if (launchHuman) this.launchHuman.publish();
  }
}

