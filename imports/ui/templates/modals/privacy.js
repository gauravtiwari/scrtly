import './privacy.html';
import { Template } from 'meteor/templating';
import Dialog from '../../utils/dialog.js';

Template.privacyDialog.onCreated(function privacyDialogOnCreated() {
  this.dialog = new Dialog;
});


Template.privacyDialog.events({
  'click #close-modal': (event, instance) => {
    event.preventDefault();
    instance.dialog.close('privacy-modal');
  },
});
