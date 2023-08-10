import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

// Workaround for TypeScript error: https://github.com/testing-library/jest-dom/issues/439#issuecomment-1536524120
declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}

// Extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

afterEach(() => {
  // Clears all mocks after every test
  vi.clearAllMocks();
  // Run a cleanup after each test case (e.g. clearing jsdom)
  cleanup();
});
