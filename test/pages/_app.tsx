import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'mobx-react';
import { homeStore } from '../store/homeStore';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  let providerProps = {
    homeStore: new homeStore()
  };
  return <Provider {...providerProps}>
    <Component {...pageProps} />
  </Provider>;
}

export default MyApp
