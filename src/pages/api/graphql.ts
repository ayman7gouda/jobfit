import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { Session } from 'next-auth';

import { PrismaClient } from '@prisma/client';

import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import { resolvers } from 'server/resolvers';
import { typeDefs } from 'server/schema';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export type Context = {
  req: NextRequest;
  res: NextResponse;
  db: PrismaClient;
  session: Session;
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req, res }): Promise<Context> => {
    const session = await getSession({ req });

    return { req, res, db: prisma, session };
  },
});

const cors = Cors();

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const session = await getSession({ req });

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
