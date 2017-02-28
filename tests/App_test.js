import assert from 'assert';
import React from 'react';

import ReactTestUtils from 'react-addons-test-utils'

import App from '../src/components/App.jsx';

/** @test {App} */
describe('App', function() {
  /** @test {App#render} */
  it('renders without problems', function() {
    const app = ReactTestUtils.renderIntoDocument(<App />);
    assert(app);
  });
});
