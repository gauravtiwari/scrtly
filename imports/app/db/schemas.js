import { Posts } from '../collections/posts.js';
import { Comments } from '../collections/comments.js';
import { Words } from '../collections/words.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Schema = {};

Schema.Word = new SimpleSchema({
  name: {
    type: String,
  },
});

Schema.Post = new SimpleSchema({
  body: {
    type: String,
    max: 1000,
  },
  ip: {
    type: String,
    label: 'User IP Address',
  },
  createdAt: {
    type: Date,
    label: 'Timestamp',
    optional: true,
  },
});

Schema.Comment = new SimpleSchema({
  body: {
    type: String,
    max: 1000,
  },
  ip: {
    type: String,
    label: 'User IP Address',
  },
  postId: {
    type: String,
  },
  createdAt: {
    type: Date,
    label: 'Timestamp',
    optional: true,
  },
});

Words.attachSchema(Schema.Word);
Posts.attachSchema(Schema.Post);
Comments.attachSchema(Schema.Comment);
