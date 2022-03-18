import { ApolloProvider } from '@apollo/client';

import { getApolloClient } from 'lib/createClient';
import { SessionProvider } from 'next-auth/react';
import 'tailwindcss/tailwind.css';

function MyApp(props) {
  // console.log(props);
  const { Component, pageProps } = props;
  const client = getApolloClient();

  return (
    <SessionProvider session={pageProps?.session} refetchInterval={0}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
