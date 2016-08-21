/* eslint no-console: 0 */

// Collections and seeds
import { Posts } from '../imports/app/collections/posts';
import { Comments } from '../imports/app/collections/comments';
import WordsSeed from '../imports/app/db/wordsSeed.js';
import Secrets from '../imports/app/db/seedData.js';

// Libs
import algoliasearch from 'algoliasearch';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

Meteor.methods({
  'Database.seed': () => {
    const client = algoliasearch(
      Meteor.settings.public.id,
      Meteor.settings.private.key
    );

    const index = client.initIndex(
      Meteor.settings.public.indexName
    );

    index.addObjects(WordsSeed, (err, content) => {
      if (err) {
        console.error(err);
      }
      console.warn(content);
    });

    _.forEach(Secrets, (post) => {
      let ipIndex = 0;
      Posts.insert({ body: post.secret.body, ip: '127.0.0.1', createdAt: new Date() }, (_error, result) => {
        _.forEach(post.secret.comments, (comment) => {
          ipIndex = ipIndex + 1;
          const Comment = {
            postId: result,
            ip: `127.0.0.${ipIndex}`,
            body: comment.body,
            createdAt: new Date(),
          };
          Comments.insert(Comment, () => {
            console.log('Comment added for', result);
          });
        });
      });
    });
  },
});
