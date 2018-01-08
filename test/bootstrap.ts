import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { expect } from 'chai';

import * as Phaser from 'phaser-ce';
import { Bootstrap } from '../src/bootstrap';
import { Controller } from '../src/controller';
import { IActionParams } from '../src/i_action_params';
import { View } from '../src/view';
import { IViewMap } from '../src/i_view_map';


const sandbox = sinon.createSandbox();

before(() => {
  chai.should();
  chai.use(sinonChai);
});

afterEach(() => {
  sandbox.restore();
});


class TestView extends View {
}

class TestController extends Controller {
  public views: IViewMap = {
    test: new TestView()
  };

  public testAction = (_params: IActionParams) => {
    this.render(this.views.test);
  }
}

describe("bootstrap", () => {
  //it("start should instanciate phaser game", () => {
  //  const game = sandbox.spy(Phaser, 'Game');

  //  const bootstrap = new Bootstrap();
  //  bootstrap.addController('TestController', TestController);
  //  bootstrap.start('TestController', 'testAction', {});
  //  expect(game).calledWithNew;
  //});

  it("should call controller views update", () => {
    //const viewUpdate = sandbox.stub(TestView.prototype, 'update'); 
    const bootstrap = new Bootstrap();

    bootstrap.addController('TestController', TestController);
    bootstrap.start('TestController', 'testAction', {});
    
    //expect(viewUpdate).to.have.been.called;
  });
});

