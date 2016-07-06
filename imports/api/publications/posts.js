import { Posts } from '../collections/posts.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('posts', () => (Posts.find()));
