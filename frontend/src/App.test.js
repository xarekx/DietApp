import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('renders login and sign up links', () => {
  act(() => {
    render(<App />);
  });
  const loginLink = screen.getByText('LOGIN');
  const registerLink = screen.getByText(/sign up/i);

  expect(loginLink).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
});

test('login and logout functionality', async () => {
  render(<App />);

  // Click Login Link
  fireEvent.click(screen.getByText('LOGIN'));

  // Fill login form
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test2@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'test21234!' } });

  fireEvent.click(screen.getByText('Login'));

  expect(await screen.findByText(/test2/i)).toBeInTheDocument();

  const logoutLink = screen.getByText('Logout');
  expect(logoutLink).toBeInTheDocument();

  fireEvent.click(screen.getByText('Logout'));

  await waitFor(() => {
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

});
