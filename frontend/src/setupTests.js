// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import sinon from 'sinon';

// Check for errors that are printed to the console:
beforeEach(() => {
  sinon.stub(console, 'error');
});
afterEach(() => {
  /* eslint-disable no-console */
  sinon.assert.notCalled(console.error);
  console.error.restore();
  /* eslint-enable no-console */
});
