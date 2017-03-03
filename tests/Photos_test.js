import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import Photos from '../src/components/Photos.jsx';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} = ReactTestUtils;

sinonStubPromise(sinon);

/** @test {Photos} */
describe('Photos', () => {
  /** @test {Photos#render} */
  it('renders correct images', () => {
    const photosData = [{
      id: '123',
      owner: 'lorem-ipsum',
      title: 'sample-title',
      url: 'http://www.example.com/image.jpg'
    }];
    const photos = renderIntoDocument(<Photos photos={photosData} />);
    const images = scryRenderedDOMComponentsWithTag(photos, 'img');

    assert.equal(images.length, 1);
    assert.equal(images[0].src, photosData[0].url);
    assert.equal(images[0].alt, photosData[0].title);
  });
});
