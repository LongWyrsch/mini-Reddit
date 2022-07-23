import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
    );
  const linkElement = screen.getByText('Search');
  expect(linkElement).toBeInTheDocument();
});
