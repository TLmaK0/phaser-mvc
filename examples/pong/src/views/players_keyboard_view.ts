import { View, ViewComponentAdder, WatchFactory, ViewNotifier } from 'phaser-mvc';

/**
 * Players View
 */
export class PlayersKeyboardView extends View<Phaser.Game> {
  private watchFactory: WatchFactory;
  onMovePlayer: ViewNotifier<[number, string]> = new ViewNotifier<[number, string]>();
  onStopPlayer: ViewNotifier<number> = new ViewNotifier<number>();

  public updateOnModelChange(watchFactory: WatchFactory){
    this.watchFactory = watchFactory;
    this.watchForKeys(0, [Phaser.Keyboard.W, Phaser.Keyboard.S]);
    this.watchForKeys(1, [Phaser.Keyboard.O, Phaser.Keyboard.K]);
  }

  private watchKeyPlayer = (playerKeyPressed: [number, boolean, boolean]) => {
    if (playerKeyPressed[1] || playerKeyPressed[2]) {
      this.onMovePlayer.publish([playerKeyPressed[0], playerKeyPressed[1] ? 'up' : 'down']);
    } else this.onStopPlayer.publish(playerKeyPressed[0]);
  }

  private watchForKeys(playerId: number, keys: number[]){
    this.watchFactory.create<[number, boolean, boolean]>(() => [
      playerId,
      this.engine.input.keyboard.isDown(keys[0]),
      this.engine.input.keyboard.isDown(keys[1])
    ]).subscribe(this.watchKeyPlayer);
  }
}
