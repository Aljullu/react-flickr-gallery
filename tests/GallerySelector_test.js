import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import GallerySelector
  from '../src/components/GallerySelector/GallerySelector.jsx';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} = ReactTestUtils;

/** @test {GallerySelector} */
describe('GallerySelector', () => {
  const galleries = [{
    id: '123',
    name: 'Lorem Ipsum'
  }, {
    id: '789',
    name: 'Foo Bar'
  }];
  const fakeFunctions = {
    setSelectedGallery123: () => null,
    setSelectedGallery789: () => null,
    onGalleryClick: () => null
  };

  /** @test {GallerySelector#onGalleryClick} */
  it('triggers on gallery click', () => {
    sinon.spy(fakeFunctions, 'setSelectedGallery123');
    sinon.spy(fakeFunctions, 'setSelectedGallery789');

    const onGalleryClickStub = sinon.stub(fakeFunctions, 'onGalleryClick');

    onGalleryClickStub.withArgs('123')
      .returns(fakeFunctions.setSelectedGallery123);
    onGalleryClickStub.withArgs('789')
      .returns(fakeFunctions.setSelectedGallery789);

    const photoContainer = renderIntoDocument(
      <GallerySelector
        galleries={galleries}
        selectedGallery="456"
        onGalleryClick={fakeFunctions.onGalleryClick} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(photoContainer, 'button');

    assert(fakeFunctions.onGalleryClick.calledTwice);
    assert(fakeFunctions.onGalleryClick.calledWith('123'));
    assert(fakeFunctions.onGalleryClick.calledWith('789'));

    Simulate.click(buttons[0]);

    assert(fakeFunctions.setSelectedGallery123.calledOnce);

    fakeFunctions.onGalleryClick.restore();
    fakeFunctions.setSelectedGallery123.restore();
    fakeFunctions.setSelectedGallery789.restore();
  });
});
