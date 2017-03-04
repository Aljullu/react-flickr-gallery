import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import PhotoContainer from '../src/components/PhotoContainer.jsx';
import Photo from '../src/components/Photo.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType
} = ReactTestUtils;

/** @test {PhotoContainer} */
describe('PhotoContainer', () => {
  const photoData = {
    owner: 'lorem-ipsum',
    title: 'sample-title',
    url: 'http://www.example.com/image.jpg'
  };

  /** @test {PhotoContainer#render} */
  it('renders correct photo', () => {
    const photoContainer = renderIntoDocument(
      <PhotoContainer
        photo={photoData}
        scrollPosition={0} />
    );

    const photo = findRenderedComponentWithType(photoContainer, Photo);

    assert.equal(photo.props.url, photoData.url);
    assert.equal(photo.props.title, photoData.title);
    assert.equal(photo.props.owner, photoData.owner);
  });

  /** @test {PhotoContainer#isPhotoInViewportVisible} */
  it('loads image if visible', () => {
    const photoContainer = renderIntoDocument(
      <PhotoContainer
        photo={photoData}
        scrollPosition={100} />
    );

    window.innerHeight = 100;

    const photo = findRenderedComponentWithType(photoContainer, Photo);

    assert(photo.props.load);
  });

  /** @test {PhotoContainer#isPhotoInViewportHIdden} */
  it('doesn\'t load image if not visible', () => {
    const photoContainer = renderIntoDocument(
      <PhotoContainer
        photo={photoData}
        scrollPosition={-100} />
    );

    window.innerHeight = -100;

    const photo = findRenderedComponentWithType(photoContainer, Photo);

    assert(!photo.props.load);
  });

  /** @test {PhotoContainer#shouldPhotoBeDisplayed} */
  it('display image if it was already loaded', () => {
    const photoContainer = renderIntoDocument(
      <PhotoContainer
        photo={photoData}
        scrollPosition={-100} />
    );

    window.innerHeight = -100;

    photoContainer.setState({
      displayImage: true
    });

    const photo = findRenderedComponentWithType(photoContainer, Photo);

    assert(photo.props.load);
  });
});