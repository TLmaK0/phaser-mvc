import { ViewComponent } from 'phaser-mvc';
import { Bootstrap } from 'phaser-mvc';

const dialog = require('../../assets/images/dialog.png');
const close_button = require('../../assets/images/close_button.png');

console.log(Bootstrap);
Bootstrap.preload((game: Phaser.Game) => {
  game.load.image('dialog', dialog);
  game.load.image('close_button', close_button);
});

export class Dialog extends ViewComponent {
  private group: Phaser.Group;

  constructor(private text: string){
    super();
  };

  public create() {
    this.group = this.game.add.group();
    this.group.visible = false;
    this.group.add(this.game.add.sprite(100,
                                        100,
                                        'dialog'));

    const button = this.game.make.button(350,
                                         60,
                                         'close_button');

    button.onInputUp.add(this.close, this);

    this.group.add(button);

    this.group.add(this.game.add.text(140,
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
}
