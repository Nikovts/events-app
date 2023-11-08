import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

test('renders all events link', () => {
  const { getByText } = render(<Navigation />);
  const linkElement = getByText(/All Events/i);
  expect(linkElement).toBeInTheDocument();
});