import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import App from '../src/components/App/App.jsx';
import Gallery from '../src/components/Gallery/Gallery.jsx';
import GallerySelector
  from '../src/components/GallerySelector/GallerySelector.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType
} = ReactTestUtils;

sinonStubPromise(sinon);

/** @test {App} */
describe('App', () => {
  beforeEach(() => {
    window.fetch = () => null;
    sinon.stub(window, 'fetch').returnsPromise();
  });

  afterEach(() => {
    window.fetch.restore();
  });

  /** @test {App#render} */
  it('renders correct gallery', () => {
    const app = renderIntoDocument(<App />);
    const gallery = findRenderedComponentWithType(app, Gallery);

    app.setState({
      selectedGallery: '456'
    });

    assert.equal(gallery.props.galleryId, '456');
  });

  /** @test {Gallery#setSelectedGallery} */
  it('sets correct selectedGallery value in the state', () => {
    const app = renderIntoDocument(<App />);

    const gallerySelector = findRenderedComponentWithType(app, GallerySelector);

    gallerySelector.props.onGalleryClick('123')();

    assert.equal(app.state.selectedGallery, '123');
  });
});
