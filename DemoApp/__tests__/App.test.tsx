/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  let root: any;
  await ReactTestRenderer.act(() => {
    root = ReactTestRenderer.create(<App />);
  });
  expect(root.toJSON()).toBeTruthy();
  await ReactTestRenderer.act(() => {
    root.unmount();
  });
});
