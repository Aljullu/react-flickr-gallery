import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import Lightbox from '../src/components/Lightbox/Lightbox.jsx';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} = ReactTestUtils;

/** @test {Lightbox} */
describe('Lightbox', () => {
  const photoData = {
    title: 'sample-title',
    url: 'http://www.example.com/image.jpg'
  };
  const fakeFunctions = {
    onClose: () => null
  };

  /** @test {Lightbox#onClose} */
  it('triggers on close', () => {
    sinon.spy(fakeFunctions, 'onClose');

    const photoContainer = renderIntoDocument(
      <Lightbox
        onClose={fakeFunctions.onClose}
        photo={photoData} />
    );
    const lightbox =
      findRenderedDOMComponentWithClass(photoContainer, 'lightbox');

    Simulate.click(lightbox);

    assert(fakeFunctions.onClose.calledOnce);

    fakeFunctions.onClose.restore();
  });
});
