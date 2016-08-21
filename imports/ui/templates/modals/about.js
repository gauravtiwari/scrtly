import './about.html';
import { Template } from 'meteor/templating';
import Dialog from '../../utils/dialog.js';

Template.aboutDialog.onCreated(function aboutDialogOnCreated() {
  this.dialog = new Dialog;
});


Template.aboutDialog.events({
  'click #close-modal': (event, instance) => {
    event.preventDefault();
    instance.dialog.close('about-modal');
  },
});
