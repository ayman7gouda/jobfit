import { setContext } from 'apollo-link-context';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import type { NextRequest } from "next/server";

const isServer = typeof window === "undefined";
const windowApolloState =
  !isServer && (window.__NEXT_DATA__ as any).apolloState;

let CLIENT;

export function getApolloClient(req: NextRequest, forceNew?: boolean) {
  if (!CLIENT || forceNew) {
    const httpLink = createHttpLink({
      uri: "http://localhost:3000/api/graphql",
      credentials: "include",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Cookie: (req.headers as any).cookie
            ? (req.headers as any).cookie
            : "",
        },
      };
    });

    CLIENT = new ApolloClient({
      ssrMode: isServer,
      // uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:3000/api/graphql",
      link: authLink.concat(httpLink as any) as any,

      cache: new InMemoryCache().restore(windowApolloState || {}),

      /**
        // Default options to disable SSR for all queries.
        defaultOptions: {
          // Skip queries when server side rendering
          // https://www.apollographql.com/docs/react/data/queries/#ssr
          watchQuery: {
            ssr: false
          },
          query: {
            ssr: false
          }
          // Selectively enable specific queries like so:
          // `useQuery(QUERY, { ssr: true });`
        }
      */
    });
  }
  return CLIENT;
}
