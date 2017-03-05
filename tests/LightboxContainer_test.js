import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import photoFixture from 'text-loader!./fixtures/photo.xml';
import formattedPhotoFixture
  from 'text-loader!./fixtures/formattedPhoto.json';
import LightboxContainer from '../src/components/LightboxContainer.jsx';
import Lightbox from '../src/components/Lightbox.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType
} = ReactTestUtils;

sinonStubPromise(sinon);

/** @test {LightboxContainer} */
describe('LightboxContainer', () => {
  let windowFetch = {};
  const photoData = {
    id: '123',
    title: 'sample-title',
    url: 'http://www.example.com/image.jpg'
  };
  const photoInfo = [{
    owner: 'Lorem Ipsum',
    date: 'XYZ',
    link: 'http://www.example.com/'
  }];
  const onClose = () => null;

  beforeEach(() => {
    window.fetch = () => null;
    windowFetch =
      sinon.stub(window, 'fetch').returnsPromise();
  });

  afterEach(() => {
    window.fetch.restore();
  });

  /** @test {LightboxContainer#render} */
  it('renders correct Lightbox', () => {
    const lightboxContainer = renderIntoDocument(
      <LightboxContainer
        photo={photoData}
        onClose={onClose} />
    );

    lightboxContainer.setState({
      photoInfo: photoInfo
    });

    const lightbox =
      findRenderedComponentWithType(lightboxContainer, Lightbox);

    assert.equal(lightbox.props.photo.date, photoInfo.date);
    assert.equal(lightbox.props.photo.link, photoInfo.link);
    assert.equal(lightbox.props.photo.owner, photoInfo.owner);
    assert.equal(lightbox.props.photo.title, photoData.title);
    assert.equal(lightbox.props.photo.url, photoData.url);
  });

  /** @test {LightboxContainer#parsePhotoInfo} */
  it('parses photo info', () => {
    const lightboxContainer = renderIntoDocument(
      <LightboxContainer
        photo={photoData}
        onClose={onClose} />
    );

    const parsedPhoto = lightboxContainer.parsePhotoInfo(photoFixture);

    assert.equal(JSON.stringify(parsedPhoto),
      JSON.stringify(JSON.parse(formattedPhotoFixture)));
  });

  /** @test {LightboxContainer#fetchPhotoInfo} */
  it('correctly fetches photo info', () => {
    renderIntoDocument(
      <LightboxContainer
        photo={photoData}
        onClose={onClose} />
    );

    assert(windowFetch.calledOnce);
    assert.equal(windowFetch.args[0][0],
      'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=a042a5f1babdcbda4e431eba7099d329&photo_id=123');
  });
});
