import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { Posts } from '../../../imports/app/collections/posts.js';
import '../templates/secret/secret.js';
import './secret-list.html';

const page = new ReactiveVar(20);

Template.secretList.onCreated(function secretListOnCreated() {
  this.autorun(() => {
    this.subscribe('posts', page.get());
  });
});

const scrolledToBottom = () => (
  $(window).scrollTop() > $(document).height() - $(window).height() - 100
);

const loadMore = () => {
  $(window).scroll(() => {
    window.requestAnimationFrame(() => {
      if (scrolledToBottom()) {
        page.set(page.get() + 20);
      }
    });
  });
};

Template.secretList.onRendered(() => {
  loadMore();
});

Template.secretList.helpers({
  secrets() {
    return Posts.find();
  },
});
