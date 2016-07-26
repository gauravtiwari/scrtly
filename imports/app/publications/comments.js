import { Comments } from '../collections/comments.js';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

Meteor.publish('comments', (id) => {
  check(id, Match.Any);
  return Comments.find({ postId: id }, { sort: { createdAt: -1 } });
});
