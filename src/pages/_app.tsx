import { AppProps } from 'next/app';

import RootLayout from '@/components/layouts/RootLayout';

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default App;
