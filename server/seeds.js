/* eslint no-console: 0 */

import { Posts } from '../imports/app/collections/posts';
import { Comments } from '../imports/app/collections/comments';
import { Words } from '../imports/app/collections/words';

import WordsSeed from '../imports/app/db/wordsSeed.js';
import Secrets from '../imports/app/db/seedData.js';

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

Meteor.methods({
  'Database.seed': () => {
    _.forEach(WordsSeed, (word) => {
      Words.insert({ name: word }, (_error, result) => {
        console.log('Words added', result);
      });
    });

    _.forEach(Secrets, (post) => {
      Posts.insert({ body: post.secret.body, ip: '127.0.0.1' }, (_error, result) => {
        _.forEach(post.secret.comments, (comment) => {
          const Comment = {
            postId: result,
            ip: '127.0.0.1',
            body: comment.body,
          };
          Comments.insert(Comment, () => {
            console.log('Comment added for', result);
          });
        });
      });
    });
  },
});
