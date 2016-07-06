/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
/* eslint no-underscore-dangle: 0 */

import { Posts } from './collections/posts.js';
import { Comments } from './collections/comments.js';
import { Words } from './collections/words.js';

export const schema = [`
type Word {
  name: String
  _id: String
}

type Post {
  _id: String
  body: String
  ip: String
  comments: [Comment]
}

type Comment {
  _id: String
  body: String
  ip: String
}

type Query {
  post(id: Int!): Post
  allPosts: [Post]
  words: [Word]
}

schema {
  query: Query
}
`];

export const resolvers = {
  Query: {
    post(root, args, _context) {
      return Posts.findOne(args.id);
    },

    allPosts(root, args, _context) {
      return Posts.find().fetch();
    },

    words(root, args, _context) {
      return Words.find().fetch();
    },
  },

  Post: {
    comments(post) {
      return Comments.find({ post: post._id }).fetch();
    },
  },
};
