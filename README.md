## phaser-mvc

An MVC framework for Phaser.

note: this is only for testing purposes

## install

```npm install phaser-mvc```

## Take a look to examples at /examples

![Pong](examples/pong/pong.png)

![Circus](examples/circus/circus.png)

## How to use

```javascript
// app.ts
import { Bootstrap } from 'phaser-mvc';
import { FrameController } from './controllers/frame_controller';
window.onload = () => {
  const boot = new Bootstrap();
  boot.addController('FrameController', FrameController);
  boot.start('FrameController', 'welcome', {});
};
```

```javascript
// controllers/frame_controller.ts
import { Controller } from 'phaser-mvc';
import { IActionParams } from 'phaser-mvc';
import { IViewMap } from 'phaser-mvc';
import { FrameView } from 'views/frame_view';
export class FrameController extends Controller {
  constructor() {
    super();
    this.model.dialogEnabled = true;
  }

  public views: IViewMap = {
    frame: new FrameView(),
  };

  public welcome = (params: IActionParams) => {
    this.render(this.views.frame);
  }
  public closeDialog = (params: IActionParams) => {
    this.model.dialogEnabled = false;
    this.refresh(this.views.frame);
  }
}
```

```javascript
// views/frame_view.ts
import { View } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
import { Dialog } from './components/dialog';
export class FrameView extends View {
  public create(componentAdder: ViewComponentAdder) {
    let dialog = componentAdder.addComponent(
      new Dialog(
        200, 200, 0, 0, 'This is a dialog',
        () => { this.goTo('FrameController', 'closeDialog', {}); },
      )
    );
    dialog.x = this.game.world.centerX;
    dialog.y = this.game.world.centerY;
  }

  public refresh() {
    if (!dialogEnabled) this.dialog.hidden();
  }

  public update() {
    //here change the wiew in phaser loop
  }
}
```

```javascript
// view/components/dialog.ts
import { ViewComponent } from 'phaser-mvc';
import { ViewComponentAdder } from 'phaser-mvc';
const buttonPng = require('../../assets/img/dialog/ok_button.png');
const dialog = require('../../assets/img/dialog/dialog_box.png');

ViewComponent.preload((game: Phaser.Game) => {
  game.load.spritesheet('dialogButton', buttonPng , 193, 71);
  game.load.image('dialogBox', dialog);
});

export class Dialog extends ViewComponent {
  public group: Phaser.Group;
  public sprite: Phaser.Sprite;
  public textbox: Phaser.Text;
  public button: Phaser.Button;

  constructor(public width: number, public height: number,
              public x: number, public y: number,
              public text: string, private click: () => void) {
    super();
  }

  public create() {
    this.group = this.game.add.group();
    const style = { font: '1.5em Arial', fill: '#fff', align: 'left',
      boundsAlignH: 'left', boundsAlignV: 'top',
      wordWrap: true, wordWrapWidth: this.width };

    this.textbox = this.game.add.text(this.game.world.centerX ,
                                      this.game.world.centerY - 60 ,
                                      this.text,
                                      style);

    this.textbox.anchor.setTo(0.5, 0.5);
    this.button = this.game.make.button(this.game.world.centerX , (this.game.world.centerY + 30),
                                        'buttonDialog', this.removeGroup, this, 2, 1, 0);
    this.button.onInputUp.add(this.up, this);
    this.button.width = 200;
    this.button.height = 50;
    this.button.anchor.setTo(0.5, 0.5);
    this.sprite = this.game.add.sprite(this.game.world.centerX,
                                       this.game.world.centerY, 'dialogBox');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.width = this.width;
    this.sprite.height = this.height;
    group.add(this.sprite);
    group.add(this.textbox);
    group.add(this.button);
  }
  public update() {
    //refresh component on Phaser update loop
  }
  public hidden() {
    this.group.visible = false;
  }
  public visible() {
    this.group.visible = true;
  }
}
```

## License

MIT license; see [LICENSE](./LICENSE).

(c) 2017 by Hugo Freire
