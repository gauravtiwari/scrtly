import { Posts } from '../collections/posts.js';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

const latestPost = (limit) => {
  check(limit, Match.Integer);
  return {
    find: {},
    options: { sort: { createdAt: -1 }, limit },
  };
};

Meteor.publish('posts', (limit) => {
  check(limit, Match.Integer);
  return Posts.find(
    latestPost(limit).find,
    latestPost(limit).options
  );
});

Meteor.publish('post', (id) => {
  check(id, Match.Any);
  return Posts.find({ _id: id });
});
