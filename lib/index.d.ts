// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../../phaser-ce
//   ../../@reactivex/rxjs

import * as Phaser from 'phaser-ce';
import { AsyncSubject } from '@reactivex/rxjs';
import { Observable } from '@reactivex/rxjs';
import { Observable, Observer } from '@reactivex/rxjs';

export function Body<T extends {
    new (...args: any[]): {};
}>(target: T): {
    new (...args: any[]): {
        _body: Phaser.Physics.P2.Body;
    };
} & T;

/**
    */
/** Bootstrap for the phaser-mvc.
    * Useage:
    * import { FrameController } from 'phaser-mvc';
    * import { LandEditorController } from 'phaser-mvc';
    * window.onload = () => {
    * const boot = new Bootstrap();
    * boot.addController('FrameController', FrameController);
    */
export class Bootstrap {
        width: number;
        height: number;
        game: Phaser.Game;
        protected controllers: IControllerMap;
        static onInit: AsyncSubject<Bootstrap>;
        constructor(width?: number, height?: number);
        static preload(preload: (game: Phaser.Game) => void): void;
        start(controllerName: string, controllerAction: string, params: IActionParams): void;
        preload: () => void;
        create: () => void;
        createBody(physics: any): Phaser.Physics.P2.Body;
        update: () => void;
        addController<T extends Controller>(name: string, controllerType: new () => T): void;
        goTo(controllerName: string, controllerAction: string, params: IActionParams): void;
}

/**
  * Controller accepts input from view and converts modifieds the model.
  */
export abstract class Controller {
    views: IViewMap;
    bootstrap: Bootstrap;
    model: IModel;
    readonly game: Phaser.Game;
    goTo: (controllerName: string, controllerAction: string, params: IActionParams) => void;
    getView(viewName: string): View;
    protected render(view: View): void;
    protected refresh(view: View): void;
}

/**
  * Params for controller action
  */
export interface IActionParams {
    [name: string]: {};
}

/**
  * Repository of controllers
  */
export interface IControllerMap {
    [name: string]: Controller;
}

/**
  * A model interface to use in controller
  */
export interface IModel {
    [name: string]: {};
}

/**
  * View interface respository for controlelr
  */
export interface IViewMap {
    [name: string]: View;
}

/**
    * Adds a component to the view and other view components
    */
export class ViewComponentAdder {
        constructor(components: ViewComponent[], view: View);
        addComponent<T extends ViewComponent>(component: T): T;
}
/**
    * Input and ouput for the application
    */
export abstract class View {
        protected components: ViewComponent[];
        protected initiated: boolean;
        refresh(): void;
        create(_componentAdder: ViewComponentAdder): void;
        preload(): void;
        update(): void;
        init(game: Phaser.Game, model: IModel, goTo: (controllerName: string, controllerAction: string, params: IActionParams) => void): void;
        readonly game: Phaser.Game;
        readonly model: IModel;
        createView(): void;
        updateView(): void;
        refreshView(): void;
        updateOnModelChange(_watchFactory: WatchFactory): void;
        protected goTo(controllerName: string, controllerAction: string, params: IActionParams): void;
}
/**
    * Component to be showed in view
    */
export abstract class ViewComponent {
        view: View;
        protected components: ViewComponent[];
        create(_componentAdder: ViewComponentAdder): void;
        update(): void;
        createComponent(componentAdder: ViewComponentAdder, view: View): void;
        updateComponent(): void;
        protected readonly game: Phaser.Game;
}

export class WatchFactory {
    watchsModel: WatchModel<any>[];
    constructor();
    create<T>(getModel: () => T): Observable<T>;
}

export class WatchModel<T> {
    observable: Observable<T>;
    observer: Observer<() => T>;
    getModel: () => T;
}

