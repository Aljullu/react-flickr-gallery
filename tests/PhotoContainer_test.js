import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
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
        scrollPosition={{ x: 0, y: 0 }} />
    );

    const photo = findRenderedComponentWithType(photoContainer, Photo);

    assert.equal(photo.props.url, photoData.url);
    assert.equal(photo.props.title, photoData.title);
  });

  /** @test {PhotoContainer#onSelect} */
  it('triggers on select', () => {
    sinon.spy(fakeFunctions, 'onSelect');

    const photoContainer = renderIntoDocument(
      <PhotoContainer
        onSelect={fakeFunctions.onSelect}
        photo={photoData}
        scrollPosition={{ x: 0, y: 0 }} />
    );
    const image = findRenderedDOMComponentWithClass(photoContainer, 'photo');

    Simulate.click(image);

    assert(fakeFunctions.onSelect.calledOnce);

    fakeFunctions.onSelect.restore();
  });
});
