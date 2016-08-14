/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import algoliasearch from 'algoliasearch/src/browser/builds/algoliasearch.js';

// Templates and collections
import { Comments } from '../../../../imports/app/collections/comments.js';
import './secret.html';

const client = algoliasearch(
  Meteor.settings.public.id,
  Meteor.settings.public.searchKey
);

const index = client.initIndex(
  Meteor.settings.public.indexName
);

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
  this.state = new ReactiveDict();

  this.autorun(() => {
    this.subscribe('comments', this.data._id);
    this.subscribe('searchWords', null);
  });

  this.state.setDefault({
    reactionQuery: null,
    words: [],
  });
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

const clearReactionInput = (reactInput, instance) => {
  $(reactInput).removeClass('shake');
  instance.$('.help').text('click to submit').removeClass('active');
  $(reactInput).val('');
};

Template.registerHelper('instance', () => (Template.instance()));

Template.secret.helpers({
  comments() {
    return postComments(Template.instance());
  },

  words() {
    const instance = Template.instance();
    const reactionDropdown = instance.$('.reactions-dropdown');
    index.search(
      instance.state.get('reactionQuery'),
      (err, content) => {
        if (err) {
          console.error(err);
          return;
        }
        instance.state.set('words', content.hits);
      });
    const words = instance.state.get('words');
    if (words.length > 0) {
      $(reactionDropdown).addClass('active');
    }
    return words;
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

  'click #reaction': (event, instance) => {
    const clicked = instance.$(event.target);
    const reactionDropdown = instance.$('.reactions-dropdown');
    const reaction = $(clicked).text().trim();
    const reactInput = instance.$('input');
    $(reactInput).val(reaction);
    $(reactInput).focus();
    instance.$('.help').addClass('active');
    $(reactionDropdown).removeClass('active');
  },

  'keydown #add-reaction': (event, instance) => {
    const reactInput = instance.$('input');
    const reaction = $(reactInput).val();

    if (reaction.length === 0) {
      $(reactInput).removeClass('shake');
    }

    if (event.keyCode === 13) {
      Meteor.call('addComment',
        { postId: instance.data._id, body: reaction },
        (error, result) => {
          if (error) {
            $(reactInput).addClass('shake');
            instance.$('.help').text('already commented');
          }
          if (result) {
            clearReactionInput(reactInput, instance);
          }
        }
      );
    }
  },

  'input #add-reaction': (event, instance) => {
    const reactInput = instance.$('#add-reaction');
    if ($(reactInput).hasClass('shake')) {
      clearReactionInput(reactInput, instance);
    }
  },

  keydown: _.debounce((event, instance) => {
    const dropdown = $(instance.$('.reactions-dropdown'));
    if (event.keyCode === 40 && dropdown.hasClass('active')) {
      event.preventDefault();
      dropdown.find('li:first').focus();
    }
  }),

  'keyup #add-reaction': _.debounce((event, instance) => {
    const query = $(instance.$(event.target)).val().trim();
    // Set reactive var if query words is great than 2
    if (query.length >= 2) {
      instance.state.set('reactionQuery', query);
    } else {
      instance.state.set('reactionQuery', null);
    }
  }),
});
