import { ViewComponent } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';

export class ScoreNumber extends ViewComponent {
  private lines: Phaser.Graphics[] = [];
  private position: Phaser.Point;
  private _value: number;
  private lineWidth = 10;

  constructor(origX: number, origY: number){
    super();
    this.position = new Phaser.Point(origX, origY);
  }

  public create(_componentAdder: ViewComponentAdder) {
    //upper
    this.lines.push(this.drawLine(0 - this.lineWidth, 0, 100 + this.lineWidth, 0)); // -^ 0
    this.lines.push(this.drawLine(0, 0, 0, 100)); // |< 1
    this.lines.push(this.drawLine(100, 0, 100, 100)); // |> 2

    //middle
    this.lines.push(this.drawLine(0 - this.lineWidth, 100, 100 + this.lineWidth, 100)); // - 3

    //lower
    this.lines.push(this.drawLine(0, 100, 0, 200)); // |< 4
    this.lines.push(this.drawLine(0 - this.lineWidth, 200, 100 + this.lineWidth, 200)); // - 5
    this.lines.push(this.drawLine(100, 100, 100, 200)); // |> 6
    
    this.value = 0;
  }

  public get value(){
    return this._value;
  }

  public set value(value: number){
    this._value = value;
    for (let line of this.lines) { line.visible = true }
    switch(value){
      case 0:
        this.hideLinesByPosition([3]);
        break;
      case 1:
        this.hideLinesByPosition([0, 1, 3, 4, 5]);
        break;
      case 2:
        this.hideLinesByPosition([1, 6]);
        break;
      case 3:
        this.hideLinesByPosition([1, 4]);
        break;
      case 4:
        this.hideLinesByPosition([0, 4, 5]);
        break;
      case 5:
        this.hideLinesByPosition([2, 4]);
        break;
      case 6:
        this.hideLinesByPosition([2]);
        break;
      case 7:
        this.hideLinesByPosition([1, 3, 4, 5]);
        break;
      case 8:
        break;
      case 9:
        this.hideLinesByPosition([4]);
        break;
    }
  }

  private hideLinesByPosition(lineNumbers: number[]){
    for (let lineNumber of lineNumbers){
      this.lines[lineNumber].visible = false;
    }
  }

  private drawLine(origX: number, origY: number, destX: number, destY: number){

    const line = this.game.add.graphics(0,0);
    line.clear();
    line.lineStyle(2 * this.lineWidth, 0xffffff);
    line.moveTo(this.position.x + origX,
                this.position.y + origY);
    line.lineTo(this.position.x + destX,
                this.position.y + destY);
    line.endFill();
    return line;
  }
}
