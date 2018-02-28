import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import photosFixture from 'text-loader!./fixtures/photos.xml';
import formattedPhotosFixture
  from 'text-loader!./fixtures/formattedPhotos.json';
import {Gallery} from '../src/components/Gallery/Gallery.jsx';
import LightboxContainer
  from '../src/components/LightboxContainer/LightboxContainer.jsx';
import PhotoContainer
  from '../src/components/PhotoContainer/PhotoContainer.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
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
  it('renders correct images', () => {
    const photosData = [{
      id: '123',
      title: 'sample-title',
      url: 'http://www.example.com/image.jpg'
    }];
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={{ x: 0, y: 0 }} />
    );

    gallery.setState({
      photos: photosData
    });

    const photos = scryRenderedComponentsWithType(gallery, PhotoContainer);

    assert.equal(photos.length, 1);
    assert.equal(photos[0].props.photo.url, photosData[0].url);
    assert.equal(photos[0].props.photo.title, photosData[0].title);
  });

  /** @test {Gallery#formatUrl} */
  it('correctly formats photo URLs', () => {
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={{ x: 0, y: 0 }} />
    );

    const formattedUrl = gallery.formatUrl('A', 'B', 'C', 'D');

    assert.equal(formattedUrl, 'https://c1.staticflickr.com/A/B/C_D_b.jpg');
  });

  /** @test {Gallery#fetchPhotos} */
  it('correctly fetches photos', () => {
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={-1} />
    );

    assert(windowFetch.calledOnce);
    assert.equal(windowFetch.args[0][0],
      'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=a042a5f1babdcbda4e431eba7099d329&gallery_id=123');
  });

  /** @test {Gallery#parsePhotosData} */
  it('parses photos data', () => {
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={{ x: 0, y: 0 }} />
    );

    const parsedPhotos = gallery.parsePhotosData(photosFixture);

    assert.equal(JSON.stringify(parsedPhotos),
      JSON.stringify(JSON.parse(formattedPhotosFixture).photos));
  });

  /** @test {Gallery#onSelectPhoto} */
  it('sets correct selectedPhoto value in the state', () => {
    const photosData = [{
      id: '123',
      title: 'sample-title',
      url: 'http://www.example.com/image.jpg'
    }];
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={{ x: 0, y: 0 }} />
    );

    gallery.setState({
      photos: photosData
    });

    const photos = scryRenderedComponentsWithType(gallery, PhotoContainer);

    photos[0].props.onSelect();

    assert.equal(gallery.state.selectedPhoto, photosData[0].id);
  });

  /** @test {Gallery#getSelectedPhotoData} */
  it('sends correct photo values to the LightboxContainer component', () => {
    const photosData = [{
      id: '123',
      title: 'sample-title',
      url: 'http://www.example.com/image.jpg'
    }];
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={{ x: 0, y: 0 }} />
    );

    gallery.setState({
      photos: photosData,
      selectedPhoto: '123'
    });

    const lightbox = findRenderedComponentWithType(gallery, LightboxContainer);

    assert.equal(lightbox.props.photo.title, photosData[0].title);
    assert.equal(lightbox.props.photo.url, photosData[0].url);
  });

  /** @test {Gallery#noLightbox} */
  it('does not render lightbox if no photo is selected', () => {
    const photosData = [{
      id: '123',
      title: 'sample-title',
      url: 'http://www.example.com/image.jpg'
    }];
    const gallery = renderIntoDocument(
      <Gallery
        galleryId={galleryId}
        scrollPosition={{ x: 0, y: 0 }} />
    );

    gallery.setState({
      photos: photosData,
      selectedPhoto: null
    });

    const lightboxes =
      scryRenderedComponentsWithType(gallery, LightboxContainer);

    assert.equal(lightboxes, 0);
  });
});
