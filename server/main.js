/* eslint no-underscore-dangle: 0 */

import { Meteor } from 'meteor/meteor';
import '../imports/api/db/schemas.js';
import '../imports/api/publications/posts.js';
import '../imports/api/publications/comments.js';
import { Posts } from '../imports/api/collections/posts';
import { Comments } from '../imports/api/collections/comments';
import { Words } from '../imports/api/collections/words';
import './seeds.js';

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
