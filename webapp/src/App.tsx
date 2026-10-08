import { Provider } from 'react-redux';
import Welcome from './Page/Welcome';
import { store } from './Store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Welcome />
    </Provider>
  );
}
