import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
import { Scoreboard } from './components/scoreboard';
/**
 * Field View
 */
export class FieldView extends View {
  private scoreboard: Scoreboard;

  public create(componentAdder: ViewComponentAdder) {
    this.scoreboard = componentAdder.addComponent(new Scoreboard());
    this.createNet();
  }

  public refresh() {
    //empty
  }

  public update() {
    //empty
  }

  private createNet(){
    for(let y = 0; y < 800; y += 40){
      this.drawVerticalLine(500, y, 20);
    }
  }

  private drawVerticalLine(origX: number, origY: number, length: number){
    const line = this.game.add.graphics(0,0);
    line.clear();
    line.lineStyle(20, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }
}
