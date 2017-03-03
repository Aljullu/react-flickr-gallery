import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import photosFixture from 'text-loader!./fixtures/photos.xml';
import formattedPhotosFixture from 'text-loader!./fixtures/formattedPhotos.json';
import Gallery from '../src/components/Gallery.jsx';
import Photos from '../src/components/Photos.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType
} = ReactTestUtils;

sinonStubPromise(sinon);

/** @test {Gallery} */
describe('Gallery', () => {
  let windowFetch = {};
  const galleryId = '123';

  beforeEach(() => {
    window.fetch = () => null;
    windowFetch =
      sinon.stub(window, 'fetch').returnsPromise();
  });

  afterEach(() => {
    window.fetch.restore();
  });

  /** @test {Gallery#render} */
  it('renders gallery', () => {
    const gallery = renderIntoDocument(<Gallery galleryId={galleryId} />);
    const photos = findRenderedComponentWithType(gallery, Photos);

    assert(photos);
  });

  /** @test {Gallery#formatUrl} */
  it('correctly formats photo URLs', () => {
    const gallery = renderIntoDocument(<Gallery galleryId={galleryId} />);

    const formattedUrl = gallery.formatUrl('A', 'B', 'C', 'D');

    assert.equal(formattedUrl, 'https://c1.staticflickr.com/A/B/C_D_b.jpg');
  });

  /** @test {Gallery#fetchPhotos} */
  it('correctly fetches photos', () => {
    renderIntoDocument(<Gallery galleryId={galleryId} />);

    assert(windowFetch.calledOnce);
    assert.equal(windowFetch.args[0][0],
      'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=a042a5f1babdcbda4e431eba7099d329&gallery_id=123');
  });

  /** @test {Gallery#parsePhotosData} */
  it('parses photos data', () => {
    const gallery = renderIntoDocument(<Gallery galleryId={galleryId} />);

    const parsedPhotos = gallery.parsePhotosData(photosFixture);

    assert.equal(JSON.stringify(parsedPhotos),
      JSON.stringify(JSON.parse(formattedPhotosFixture).photos));
  });
});
