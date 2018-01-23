import { View, ViewComponentAdder, WatchFactory } from 'phaser-mvc';

/**
 * Players Keys View
 */
export class PlayerKeysView extends View {
  rotateCannon: (direction: string) => void;
  rotateCannonStop: () => void;
  launchHuman: () => void;

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
    if (areKeysDown[0]) this.rotateCannon('clockwise');
    else if (areKeysDown[1]) this.rotateCannon('counter-clockwise');
    else this.rotateCannonStop();
  }

  private launchHumanNow = (launchHuman: boolean) => {
    if (launchHuman) this.launchHuman();
  }
}

