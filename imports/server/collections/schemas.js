import Posts from './posts';
import Comments from './comments';
import Words from './words';

let Schema = {};

Schema.Word = new SimpleSchema({
  name: {
    type: String,
  },
});

Schema.Post = new SimpleSchema({
  body: {
    type: String,
    max: 140
  },
  ip: {
    type: String,
    label: "User IP Address",
  },
});

Schema.Comment = new SimpleSchema({
  body: {
    type: String,
    max: 140
  },
  ip: {
    type: String,
    label: "User IP Address",
  },
  post: {
    type: Schema.Post,
  },
});

Words.attachSchema(Schema.Word);
Posts.attachSchema(Schema.Post);
Comments.attachSchema(Schema.Comment);
