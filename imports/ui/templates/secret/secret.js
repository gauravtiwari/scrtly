/* eslint no-underscore-dangle: 0 */

import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../../../../imports/app/collections/comments.js';
import { Words } from '../../../../imports/app/collections/words.js';
import { $ } from 'meteor/jquery';
import './secret.html';


const setPosition = (instance) => {
  const secretBoxHeight = instance.$('.secret-box').height();
  const headerHeight = $('header').height();
  const windowHeight = $(window).height();
  // Set the box margin
  instance.$('.inner-box').css({
    'margin-top': (windowHeight - secretBoxHeight - headerHeight) / 2,
    'margin-bottom': (windowHeight - secretBoxHeight - headerHeight) / 2,
  });
};

Template.secret.onCreated(function secretOnCreated() {
  this.reactionQuery = new ReactiveVar(null);

  this.autorun(() => {
    this.subscribe('comments', this.data._id);
    this.subscribe('searchWords', null);
  });

  this.words = () => {
    this.subscribe('searchWords', this.reactionQuery.get());
    return Words.find({}, { sort: [['score', 'desc']] });
  };
});


Template.secret.onRendered(() => {
  const instance = Template.instance();
  setPosition(instance);
  $(window).resize(() => {
    setPosition(instance);
  });
});

const postComments = (instance) => (
  Comments.find({ postId: instance.data._id })
);

Template.secret.helpers({
  comments() {
    return postComments(Template.instance());
  },

  words() {
    return Template.instance().words();
  },

  commentsCount() {
    return postComments(Template.instance()).count();
  },
});

Template.secret.events({
  'click .comment-number': (event, instance) => {
    const clicked = instance.$(event.target);
    const comments = instance.$('.comment-section');
    // Toggle comments section
    $(comments).toggleClass('active');
    // Change the button text
    if ($(comments).hasClass('active')) {
      $(clicked).find('.count').text('Hide');
    } else {
      $(clicked).find('.count').text(postComments(instance).count());
    }
  },

  'keyup #add-reaction': _.debounce((event, instance) => {
    const query = $(instance.$(event.target)).val().trim();
    // Set reactive var if query words is great than 2
    if (query.length > 2) {
      instance.reactionQuery.set(query);
    } else {
      instance.reactionQuery.set(null);
    }
  }),
});
