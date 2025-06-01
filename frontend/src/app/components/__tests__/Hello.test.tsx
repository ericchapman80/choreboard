import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from '../Hello';

describe('Hello component', () => {
  it('renders default greeting', () => {
    render(<Hello />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello, World!');
  });

  it('renders custom greeting', () => {
    render(<Hello name="Choreboard" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello, Choreboard!');
  });
});
