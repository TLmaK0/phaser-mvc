/** Bootstrap for the phaser-mvc.
 * Useage:
 * window.onload = () => {
 * const boot = new Bootstrap();
 * boot.addController('FrameController', FrameController);
 */
    static readonly WIDTH: number;
    static readonly HEIGHT: number;
    private static preloadComponents;
    game: Phaser.Game;
    protected controllers: IControllerMap;
    private startAction;
    static preloadComponent(preload: (game: Phaser.Game) => void): void;
    start(controllerName: string, controllerAction: string, params: IActionParams): void;
    preload: () => void;
    create: () => void;
    update: () => void;
    addController<T extends Controller>(name: string, controllerType: new () => T): void;
    goTo(controllerName: string, controllerAction: string, params: IActionParams): void;
    private updateController(controller);
}

/**
 * Controller accepts input from view and converts modifieds the model.
 */
    views: IViewMap;
    bootstrap: Bootstrap;
    model: IModel;
    readonly game: Phaser.Game;
    goTo(controllerName: string, controllerAction: string, params: IActionParams): void;
    getView(viewName: string): View;
    protected render(view: View): void;
    protected refresh(view: View): void;
}

/**
 * Params for controller action
 */
    [name: string]: {};
}

/**
 * Repository of controllers
 */
    [name: string]: Controller;
}

/**
 * A model interface to use in controller
 */
    [name: string]: {};
}

/**
 * Adds a component to the view
 */
    private view;
    private components;
    constructor(view: View, components: ViewComponent[]);
    addComponent<T extends ViewComponent>(component: T): T;
}

/**
 * Component to be showed in view
 */
    view: View;
    protected components: ViewComponent[];
    static preload(preload: (game: Phaser.Game) => void): void;
    create(_componentAdder: ViewComponentAdder): void;
    update(): void;
    createComponent(componentAdder: ViewComponentAdder): void;
    updateComponent(): void;
    protected readonly game: Phaser.Game;
}

/**
 * View interface respository for controlelr
 */
    [name: string]: View;
}

/**
 * Input and ouput for the application
 */
    controller: Controller;
    protected components: ViewComponent[];
    protected initiated: boolean;
    refresh(): void;
    create(_componentAdder: ViewComponentAdder): void;
    preload(): void;
    update(): void;
    init(controller: Controller): void;
    readonly game: Phaser.Game;
    readonly model: IModel;
    createView(): void;
    updateView(): void;
    refreshView(): void;
    protected goTo(controllerName: string, controllerAction: string, params: IActionParams): void;
}

