import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import App from '../src/components/App.jsx';
import Gallery from '../src/components/Gallery.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType
} = ReactTestUtils;

sinonStubPromise(sinon);

/** @test {App} */
describe('App', () => {
  /** @test {App#render} */
  it('renders gallery', () => {
    window.fetch = () => null;
    sinon.stub(window, 'fetch').returnsPromise();
    const app = renderIntoDocument(<App />);
    const gallery = findRenderedComponentWithType(app, Gallery);

    assert(gallery);

    window.fetch.restore();
  });
});
