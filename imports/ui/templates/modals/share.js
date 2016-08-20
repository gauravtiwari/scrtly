import './share.html';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import Dialog from '../../utils/dialog.js';

Template.shareDialog.onCreated(function shareDialogOnCreated() {
  this.dialog = new Dialog;
  this.state = new ReactiveDict();
  this.state.setDefault({
    counter: 200,
  });
});

Template.shareDialog.events({
  'click #close-modal': (event, instance) => {
    event.preventDefault();
    instance.dialog.close('share-modal');
  },

  'paste #comments': (event, instance) => {
    const characters = event.originalEvent.clipboardData.getData('text').trim();
    const charactersLength = characters.length;

    if (charactersLength > 200) {
      instance.$(event.target).val(characters.substring(0, 200));
    }
  },

  'keydown #comments': (event, instance) => {
    const characters = instance.$(event.target).val().trim();
    const charactersLength = characters.length;
    const remaningCharacters = 200 - charactersLength;

    if (charactersLength > 0) {
      instance.state.set('counter', remaningCharacters);
      if (remaningCharacters <= 0) {
        instance.$(event.target).val(characters.substring(0, 200));
      }
    } else {
      instance.state.set('counter', 200);
    }
  },

  'submit #form': (event, instance) => {
    event.preventDefault();
    const characters = instance.$('#comments').val().trim();
    const body = characters.substring(0, 200);

    Meteor.call('addPost',
      { body: body },
      (error, result) => {
        if (error) {
          $(instance.$(event.target)).addClass('shake');
        }
        if (result) {
          instance.$('#comments').val('');
          instance.dialog.close('share-modal');
        }
      }
    );
  },
});

Template.shareDialog.helpers({
  counter() {
    const instance = Template.instance();
    return instance.state.get('counter');
  },
});
