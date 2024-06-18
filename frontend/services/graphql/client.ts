import { GraphQLClient } from 'graphql-request'
import { getClientEnv } from '@/consts/client'

export const graphqlClient = new GraphQLClient(getClientEnv().graphqlEndpoint)
