/**
 */

import * as Phaser from 'phaser-ce';
import { AsyncSubject } from '@reactivex/rxjs';

import { Controller } from './controller';
import { View } from './view';
import { PhysicBody } from './physic_body';
import { Guid } from './guid';

export class Bootstrap {
  private static preloadComponents: ((game: Phaser.Game) => void)[] = [];

  private static _instance: Bootstrap;

  public game: Phaser.Game;

  public static worldConfiguration = {
    bounds {
      width: 1920,
      height: 1080
    },
    material {
      restitution: 0
    }
  }

  private defaultAction: () => void;

  private views: View[] = [];

  public static get instance(){
    return this._instance || (this._instance = new this());
  }

  public static onInit: AsyncSubject<Bootstrap> = new AsyncSubject<Bootstrap>();

  public constructor(){
  }

  public static preload(preload: (game: Phaser.Game) => void): void {
    Bootstrap.preloadComponents.push(preload);
  }

  public static run(defaultAction: () => void){
    Bootstrap.instance.defaultAction = defaultAction;
    Bootstrap.instance.startEngines();
  }

  private startEngines(){
    this.game = new Phaser.Game(
      Bootstrap.worldConfiguration.bounds.width,
      Bootstrap.worldConfiguration.bounds.height,
      Phaser.CANVAS,
      'content',
      { preload: this.preload,
        create: this.create,
        update: this.update});
  }

  public preload = (): void => {
    for (const preload of Bootstrap.preloadComponents) {
      preload(this.game);
    }
  }

  public create = (): void => {
    this.worldCustomizations();
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.defaultAction();

    Bootstrap.onInit.next(this);
    Bootstrap.onInit.complete();
  }

  public update = (): void => {
    this.updateViews();
  }

  public registerView(view: View){
    this.views.push(view);
  }

  private updateViews(){
    for (const view of this.views){
      view.updateView();
    }
  }

  private materialsAndOptions: Array<[Phaser.Physics.P2.Material, any]> = [];

  private worldCustomizations(){
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    const worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');

    this.materialsAndOptions.push([worldMaterial, Bootstrap.worldConfiguration.material]);

    this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
    this.game.physics.p2.gravity.y = 100;

  }


  public createBody(physicBody: PhysicBody){
    const sprite = this.game.add.sprite(0,0, null);
    this.game.physics.p2.enable(sprite);
    const body = new Phaser.Physics.P2.Body(this.game, sprite, physicBody.x, physicBody.y, physicBody.mass);
    body.velocity.x = physicBody.velocity[0];
    body.velocity.y = physicBody.velocity[1];
    body.angle = physicBody.angle;
    const material = this.game.physics.p2.createMaterial(Guid.newGuid(), body);
    const bodyOptions = physicBody.getPhysicsConfiguration();
    for(const materialAndOptions of this.materialsAndOptions){
      this.generateContacts(material, bodyOptions.material, materialAndOptions[0], materialAndOptions[1]);
    }

    this.materialsAndOptions.push([material, bodyOptions.material]);
    return body;
  }

  private generateContacts(material1: Phaser.Physics.P2.Material,
                           options1: any,
                           material2: Phaser.Physics.P2.Material,
                           options2: any
                          ){
    let contactOptions: any = {};
    for (const key in options1){
      contactOptions[key] = options1[key] + options2[key];
    }

    this.game.physics.p2.createContactMaterial(material1, material2, contactOptions);
  }
}
