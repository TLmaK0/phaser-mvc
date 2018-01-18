import { View, ViewComponentAdder, WatchFactory } from 'phaser-mvc';

/**
 * Players View
 */
export class PlayersKeyboardView extends View {
  private watchFactory: WatchFactory;

  public updateOnModelChange(watchFactory: WatchFactory){
    this.watchFactory = watchFactory;
    this.watchForKeys(0, [Phaser.Keyboard.W, Phaser.Keyboard.S]);
    this.watchForKeys(1, [Phaser.Keyboard.O, Phaser.Keyboard.K]);
  }

  private watchKeyPlayer = (playerKeyPressed: [number, boolean, boolean]) => {
    if (playerKeyPressed[1] || playerKeyPressed[2]) {
      this.movePlayer(playerKeyPressed[0], playerKeyPressed[1] ? 'up' : 'down');
    } else this.stopPlayer(playerKeyPressed[0]);
  }

  private watchForKeys(playerId: number, keys: number[]){
    this.watchFactory.create<[number, boolean, boolean]>(() => [
      playerId,
      this.game.input.keyboard.isDown(keys[0]),
      this.game.input.keyboard.isDown(keys[1])
    ]).subscribe(this.watchKeyPlayer);
  }

  private movePlayer(playerId: number, direction: string){
    this.goTo('PlayersController', 'movePlayer', { player: playerId, direction: direction });
  }

  private stopPlayer(playerId: number){
    this.goTo('PlayersController', 'stopPlayer', { player: playerId });
  }
}
