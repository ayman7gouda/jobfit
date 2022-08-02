import { setContext } from 'apollo-link-context';

import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';

import type { NextRequest } from "next/server";

const isServer = typeof window === "undefined";
const windowApolloState =
  !isServer && (window.__NEXT_DATA__ as any).apolloState;

let ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL;
let GRAPHQL_ENDPOINT = ROOT_URL + "/api/graphql";
let CLIENT: any;

let DATA_ENDPOINT = "http://localhost:8000";

export function getApolloClient(req?: NextRequest, forceNew?: boolean) {
  console.log("Starting data endpoint at: " + GRAPHQL_ENDPOINT);
  console.log("Starting science endpoint at: " + DATA_ENDPOINT);

  if (!CLIENT || forceNew) {
    const dataLink = createHttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: "include",
    });

    const scienceLink = createHttpLink({
      uri: DATA_ENDPOINT,
      // credentials: "include",
    });

    const httpLink = ApolloLink.split(
      (operation) => operation.getContext().clientName === "science",
      // the string "third-party" can be anything you want,
      // we will use it in a bit
      scienceLink, // <= apollo will send to this if clientName is "third-party"
      dataLink // <= otherwise will send to this
    );

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Cookie: (req?.headers as any)?.cookie
            ? (req?.headers as any)?.cookie
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
