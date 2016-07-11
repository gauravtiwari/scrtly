import { Posts } from '../collections/posts';
import { Comments } from '../collections/comments';
import { Words } from '../collections/words';

/* global SimpleSchema */

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
});

Words.attachSchema(Schema.Word);
Posts.attachSchema(Schema.Post);
Comments.attachSchema(Schema.Comment);
