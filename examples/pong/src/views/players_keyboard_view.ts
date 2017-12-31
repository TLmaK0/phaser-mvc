import { View, ViewComponentAdder } from 'phaser-mvc';

/**
 * Players View
 */
export class PlayersKeyboardView extends View {
  playersLastKey: number[] = [Phaser.Keyboard.ZERO, Phaser.Keyboard.ZERO];
  public create(_componentAdder: ViewComponentAdder) {
  }

  public update(){
    if (this.keyboardDownKey(Phaser.Keyboard.UP, 1)){
      this.goTo('PlayersController', 'MovePlayer', { player: 1, direction: 'up' });
    }
  }

  private keyboardDownKey(key: number, playerId: number){
    return this.game.input.keyboard.isDown(key) && this.playersLastKey[playerId] != key;
  }
}
