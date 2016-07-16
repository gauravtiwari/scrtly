/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
/* eslint no-underscore-dangle: 0 */

import { Posts } from './collections/posts.js';
import { Comments } from './collections/comments.js';
import { Words } from './collections/words.js';

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

const getViewer = () => {
  const viewer = {};
  viewer.id = "root";
  return viewer;
};

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Post') {
      return resolvePost(id);
    } else if (type === 'Comment') {
      return resolveComment(id);
    } else if (type === 'Word') {
      return resolveWord(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Widget)  {
      return widgetType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Root type for reading data',
  fields: () => ({
    id: globalIdField('Viewer'),
    posts: {
      type: PostConnection,
      description: 'A collection of posts for viewer',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(resolveAllPosts(), args),
    },
    word: {
      type: WordType,
      description: 'Get a word for comment',
      resolve: (_, args) => connectionFromArray(resolveWord(), args),
    }
  }),
  interfaces: [nodeInterface],
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'A single post',
  fields: () => ({
    id: globalIdField('Post'),
    body: {
      type: GraphQLString,
    },
    comments: {
      type: CommentConnection,
      description: 'A collection of comments for viewer',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(resolvePostComments(), args),
    },
  }),
  interfaces: [nodeInterface],
});

const WordType = new GraphQLObjectType({
  name: 'Word',
  description: 'A single word',
  fields: () => ({
    id: globalIdField('Word'),
    name: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A single comment',
  fields: () => ({
    id: globalIdField('Post'),
    body: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});


/**
 * Define your own connection types here
 */
const { connectionType: PostConnection } =
  connectionDefinitions({
    name: 'Post', nodeType: PostType
  });

const { connectionType: CommentConnection } =
  connectionDefinitions({
    name: 'Comment', nodeType: CommentType
  });

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: ViewerType,
      resolve: () => getViewer(),
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
const Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});

const resolvePost = (args) => {
  return Posts.findOne(args.id);
};

const resolveComment = (args) => {
  return Comments.findOne(args.id);
};

const resolveWord = (args) => {
  return Words.findOne(args.id);
};

const resolveAllPosts = (args) => {
  return Posts.find().fetch();
};

const resolvePostComments = (args) => {
  return Comments.find({ post: post._id }).fetch();
};


export default Schema;