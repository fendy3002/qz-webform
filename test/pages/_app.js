import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'mobx-react';
import { homeStore } from '../store/homeStore';

function MyApp({ Component, pageProps }) {
  let providerProps = {
    homeStore: new homeStore()
  };
  return <Provider {...providerProps}>
    <Component {...pageProps} />
  </Provider>;
}

export default MyApp
