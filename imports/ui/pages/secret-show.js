import './secret-show.html';
import { Template } from 'meteor/templating';
import { Posts } from '../../../imports/app/collections/posts.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../templates/secret/secret.js';


Template.secretShow.onCreated(function secretShowOnCreated() {
  this.getPostId = () => FlowRouter.getParam('_id');
  this.autorun(() => {
    this.subscribe('post', this.getPostId());
  });
});


Template.secretShow.helpers({
  content() {
    const instance = Template.instance();
    return Posts.findOne(instance.getPostId());
  },
});
