import React from 'react';
import { render, screen } from '@testing-library/react';

import { HelloWorld } from '../hello-world';

const TEST_MESSAGE = 'Dashboards are cool';

describe('Hello world', () => {
  test('renders message', () => {
    render(<HelloWorld message={TEST_MESSAGE} />);
    expect(screen.getByRole('note')).toHaveTextContent(TEST_MESSAGE);
  });
});
