import { Meteor } from 'meteor/meteor';
import { apolloServer } from 'apollo-server';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';
import { check } from 'meteor/check';
import { Comments } from '../imports/server/collections/comments';
import { Words } from '../imports/server/collections/words';

import { schema, resolvers } from '/imports/api/schema';

const GRAPHQL_PORT = 4000;

const graphQLServer = express();

graphQLServer.use('/graphql', apolloServer(async (req) => {
  return {
    graphiql: true,
    pretty: true,
    schema,
    resolvers,
  };
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));

Meteor.startup(function () {
  Words._ensureIndex({ "name": 1});
  Comments._ensureIndex({ "post": 1});
});
