import { Words } from '../collections/words.js';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

Meteor.publish('searchWords', (query) => {
  check(query, Match.Any);

  if (!query) {
    return;
  }

  const cursor = Words.find(
    { name: { $regex: new RegExp(query), $options: 'i' } }
  );

  return cursor;
});
