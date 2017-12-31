import { View, ViewComponentAdder } from 'phaser-mvc';

/**
 * Players View
 */
export class PlayersKeyboardView extends View {
  playersLastKey: number[] = [Phaser.Keyboard.ZERO, Phaser.Keyboard.ZERO];
  public create(_componentAdder: ViewComponentAdder) {
  }

  public update(){
    if (this.keyboardDownKey(Phaser.Keyboard.W, 0)) this.movePlayer(0, 'up');
    if (this.keyboardDownKey(Phaser.Keyboard.S, 0)) this.movePlayer(0, 'down');
    if (this.keyboardDownKey(Phaser.Keyboard.UP, 1)) this.movePlayer(1, 'up');
    if (this.keyboardDownKey(Phaser.Keyboard.DOWN, 1)) this.movePlayer(1, 'down');

    this.stopPlayerIfNeeded([Phaser.Keyboard.S, Phaser.Keyboard.W], 0);
    this.stopPlayerIfNeeded([Phaser.Keyboard.DOWN, Phaser.Keyboard.UP], 1);
  }

  private keysPressed(keys: number[]){
    const keyboard = this.game.input.keyboard;
    let pressed = false;
    for(const key of keys){
      pressed = pressed || keyboard.isDown(key);   
    }
    return pressed;
  }

  private stopPlayerIfNeeded(keys: number[], playerId: number){
    if (this.playersLastKey[playerId] != Phaser.Keyboard.ZERO && !this.keysPressed(keys)) {
      this.playersLastKey[playerId] = Phaser.Keyboard.ZERO;
      this.goTo('PlayersController', 'stopPlayer', { player: playerId });
    }
  }

  private movePlayer(playerId: number, direction: string){
    this.goTo('PlayersController', 'movePlayer', { player: playerId, direction: direction });
  }

  private keyboardDownKey(key: number, playerId: number){
    const newKey = this.playersLastKey[playerId] != key && this.game.input.keyboard.isDown(key);
    if (newKey) this.playersLastKey[playerId] = key;
    return newKey;
  }
}
