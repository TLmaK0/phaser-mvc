import { ViewComponent } from 'phaser-mvc';

const dialog = require('../../assets/images/dialog.png');
const close_button = require('../../assets/images/close_button.png');

export class Dialog extends ViewComponent<Phaser.Game> {
  private group: Phaser.Group;

  constructor(private text: string){
    super();
  };

  public create() {
    this.group = this.engine.add.group();
    this.group.visible = false;
    this.group.add(this.engine.add.sprite(100,
                                        100,
                                        'dialog'));

    const button = this.engine.make.button(350,
                                         60,
                                         'close_button');

    button.onInputUp.add(this.close, this);

    this.group.add(button);

    this.group.add(this.engine.add.text(140,
                                      150,
                                      this.text,
                                      { fill: '#000' }))
  }

  public close() {
    this.group.visible = false;
  }

  public open() {
    this.group.visible = true;
  }

  public preload(){
    this.engine.load.image('dialog', dialog);
    this.engine.load.image('close_button', close_button);
  }
}
