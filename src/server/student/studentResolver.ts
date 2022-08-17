import { Resolvers } from 'generated/serverTypes';

export const studentResolver: Resolvers = {
  Query: {
    studentById(_, { id }, context) {
        return {
            id,
            name: "Tomas"
        }
    },
    students() {
        
    }
  }
}