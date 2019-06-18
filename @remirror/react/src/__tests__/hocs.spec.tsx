import React from 'react';

import { omit } from '@remirror/core';
import { injectedPropsShape, positionerShape } from '@test-fixtures/object-shapes';
import { createTestManager } from '@test-fixtures/schema-helpers';
import { render } from '@testing-library/react';
import { RemirrorProvider } from '../components/providers';
import { withPositioner, withRemirror } from '../hocs';
import { bubblePositioner } from '../positioners';

test('withRemirror', () => {
  const mock = jest.fn();
  const Cmp = withRemirror(props => {
    mock(props);
    return <div />;
  });

  render(
    <RemirrorProvider manager={createTestManager()}>
      <Cmp />
    </RemirrorProvider>,
  );

  expect(mock).toHaveBeenCalledWith(expect.objectContaining(injectedPropsShape));
});

test('withPositioner', () => {
  const mock = jest.fn();
  const Menu = withPositioner({ positioner: bubblePositioner, positionerId: 'bubble', refKey: 'altRef' })(
    props => {
      mock(props);
      return <div />;
    },
  );

  render(
    <RemirrorProvider manager={createTestManager()}>
      <Menu />
    </RemirrorProvider>,
  );

  expect(mock).toHaveBeenCalledWith(
    expect.objectContaining({ ...omit(positionerShape, ['ref']), altRef: expect.any(Function) }),
  );
});
