import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {LazyLoadImage} from 'react-lazy-load-image-component';

import Photo from '../src/components/Photo/Photo.jsx';

const {
  renderIntoDocument,
  findRenderedComponentWithType
} = ReactTestUtils;

/** @test {Photo} */
describe('Photo', () => {
  const photoData = {
    title: 'sample-title',
    url: 'http://www.example.com/image.jpg'
  };

  /** @test {Photo#props} */
  it('sets corrects props to LazyLoadImage component', () => {
    const scrollPosition = { x: 0, y: 0 };
    const photoContainer = renderIntoDocument(
      <Photo
        load={true}
        title={photoData.title}
        url={photoData.url}
        scrollPosition={scrollPosition} />
    );

    const lazyLoadImage =
      findRenderedComponentWithType(photoContainer, LazyLoadImage);

    assert.equal(lazyLoadImage.props.alt, photoData.title);
    assert.equal(lazyLoadImage.props.src, photoData.url);
    assert.equal(lazyLoadImage.props.scrollPosition, scrollPosition);
  });
});
