import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import PhotoContainer
  from '../src/components/PhotoContainer/PhotoContainer.jsx';
import Photo from '../src/components/Photo/Photo.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate
} = ReactTestUtils;

/** @test {PhotoContainer} */
describe('PhotoContainer', () => {
  const photoData = {
    title: 'sample-title',
    url: 'http://www.example.com/image.jpg'
  };
  const fakeFunctions = {
    onSelect: () => null
  };

  /** @test {PhotoContainer#render} */
  it('renders correct photo', () => {
    const photoContainer = renderIntoDocument(
      <PhotoContainer
        onSelect={fakeFunctions.onSelect}
        photo={photoData}
        scrollPosition={0} />
    );

    const photo = findRenderedComponentWithType(photoContainer, Photo);

    assert.equal(photo.props.url, photoData.url);
    assert.equal(photo.props.title, photoData.title);
  });

  /** @test {PhotoContainer#isPhotoInViewportVisible} */
  it('loads image if visible', () => {
    const photoContainer = renderIntoDocument(
      <PhotoContainer
        onSelect={fakeFunctions.onSelect}
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
        onSelect={fakeFunctions.onSelect}
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
        onSelect={fakeFunctions.onSelect}
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

  /** @test {PhotoContainer#onSelect} */
  it('triggers on select', () => {
    sinon.spy(fakeFunctions, 'onSelect');

    const photoContainer = renderIntoDocument(
      <PhotoContainer
        onSelect={fakeFunctions.onSelect}
        photo={photoData}
        scrollPosition={-100} />
    );
    const image = findRenderedDOMComponentWithClass(photoContainer, 'photo');

    Simulate.click(image);

    assert(fakeFunctions.onSelect.calledOnce);

    fakeFunctions.onSelect.restore();
  });
});
