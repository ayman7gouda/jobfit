import { gql } from 'apollo-server-micro';
import fs from 'fs';
import path from 'path';

function readGql(source: string) {
  return gql(
    fs.readFileSync(path.resolve(path.join("src", "server", source)), "utf8")
  );
}

// TODO: Maybe dynamic import
export const typeDefs = [
  readGql("./shared/schema.graphql"),
  readGql("./job/job.graphql"),
  readGql("./skill/skill.graphql"),
];
