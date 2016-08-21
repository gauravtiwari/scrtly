/* eslint no-underscore-dangle: 0 */

import '../imports/app/publications/posts.js';
import '../imports/app/publications/comments.js';
import '../imports/app/publications/words.js';
import '../imports/app/db/schemas.js';

import { Meteor } from 'meteor/meteor';
import { Posts } from '../imports/app/collections/posts';
import { Comments } from '../imports/app/collections/comments';
import { Words } from '../imports/app/collections/words';

import './seeds.js';

if(Meteor.isServer) {
  Meteor.methods({
    addComment: (comment) => {
      const commentObj = {
        ip: DDP._CurrentInvocation.get().connection.clientAddress,
        ...comment,
        createdAt: new Date(),
      };
      return Comments.insert(commentObj);
    },

    addPost: (post) => {
      const postObj = {
        ip: DDP._CurrentInvocation.get().connection.clientAddress,
        ...post,
        createdAt: new Date(),
      };
      return Posts.insert(postObj);
    }
  });
}

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
    body: 1,
    ip: 1,
  }, { unique: true , sparse: true });
});
