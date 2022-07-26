import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const appHeading = screen.getByText(/artist alley/i);
  expect(appHeading).toBeInTheDocument();
});
