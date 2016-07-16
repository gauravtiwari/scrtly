/* eslint no-underscore-dangle: 0 */

import { Meteor } from 'meteor/meteor';
import proxyMiddleware from 'http-proxy-middleware';
import express from 'express';

import '../imports/api/db/schemas.js';
import '../imports/api/publications/posts.js';
import '../imports/api/publications/comments.js';
import { Posts } from '../imports/api/collections/posts';
import { Comments } from '../imports/api/collections/comments';
import { Words } from '../imports/api/collections/words';
import './seeds.js';

import Schema from '../imports/api/schema.js';
import graphqlHTTP from 'express-graphql';

const graphQLServer = express();
const GRAPHQL_PORT = 4000;

graphQLServer.use('/graphql', graphqlHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));


WebApp.rawConnectHandlers.use(
  proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`)
);

Meteor.startup(() => {
  // Posts.remove({});
  // Comments.remove({});
  // Words.remove({});
  if (Posts.find().count() === 0) {
    Meteor.call('Database.seed');
  }

  Words._ensureIndex({
    name: 1,
  });

  Comments._ensureIndex({
    postId: 1,
  });
});
