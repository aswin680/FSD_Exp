import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders the correct text', () => {
    render(<Header title="Test Title" />);
    const headingElement = screen.getByTestId('header-title');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe('Test Title');
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    render(<Header title="Click Me" onTitleClick={handleClick} />);
    
    const headingElement = screen.getByTestId('header-title');
    fireEvent.click(headingElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
