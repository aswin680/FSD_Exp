import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm Component', () => {
  it('shows error message on invalid email submission', async () => {
    // Fill input fields & trigger submit
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(emailInput, 'invalidemail');
    fireEvent.click(submitBtn);

    // Assert validation messages
    expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email address');
  });

  it('shows error on short message', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hi');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByTestId('error-message')).toHaveTextContent('Message must be at least 5 characters');
  });

  it('shows success message on valid submission', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello there!');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('success-message')).toHaveTextContent('Form submitted successfully!');
  });
});
