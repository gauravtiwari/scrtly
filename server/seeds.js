/* eslint no-console: 0 */

import { Posts } from '../imports/api/collections/posts';
import { Comments } from '../imports/api/collections/comments';
import { Words } from '../imports/api/collections/words';

import WordsSeed from '../imports/api/fixtures/words';
import PostsSeed from '../imports/api/fixtures/posts';

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

Meteor.methods({
  'Database.seed': () => {
    _.forEach(WordsSeed, (word) => {
      Words.insert({ name: word }, (_error, result) => {
        console.log('Words added', result);
      });
    });

    _.forEach(PostsSeed, (post) => {
      Posts.insert(post, (_error, result) => {
        const Comment = {
          post: result,
          ip: '127.0.0.1',
          body: 'adventurous, awesome, cool',
        };
        Comments.insert(Comment, () => {
          console.log('Comment added for', result);
        });
      });
    });
  },
});
