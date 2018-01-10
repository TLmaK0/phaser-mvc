import { View, ViewComponentAdder, WatchFactory } from 'phaser-mvc';

/**
 * Players Keys View
 */
export class PlayerKeysView extends View {
  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<[boolean, boolean]>(() => [
      this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT),
      this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
    ]).subscribe(this.moveCannon);
    watchFactory.create<boolean>(() => this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)).subscribe(this.launchHuman);
  }

  private moveCannon = (areKeysDown: [boolean, boolean]) => {
    if (areKeysDown[0]) this.goTo("CannonController", "rotateCannon", { direction: 'clockwise' });
    else if (areKeysDown[1]) this.goTo("CannonController", "rotateCannon", { direction: 'counter-clockwise' });
    else this.goTo("CannonController", "rotateCannonStop", {});
  }

  private launchHuman = (launchHuman: boolean) => {
    if (launchHuman) this.goTo("CannonController", "launchHuman", {});
  }
}

