import {
  render,
  screen,
  within,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/state/store';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  within(screen.getByText(/learn/i));
});
