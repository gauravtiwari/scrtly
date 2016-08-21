import './response.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import Clipboard from 'clipboard';
import Dialog from '../../utils/dialog.js';

Template.responseDialog.onCreated(function responseDialogOnCreated() {
  this.dialog = new Dialog;
});

Template.responseDialog.onRendered(() => {
  const instance = Template.instance();
  const clipboard = new Clipboard(instance.$('#copy-text')[0]);

  clipboard.on('success', (e) => {
    $(instance.$('#copy-text')[0]).text('Copied');
    setTimeout(() => {
      $(instance.$('#copy-text')[0]).text('Copy');
    }, 5000);
    e.clearSelection();
  });
});

Template.responseDialog.events({
  'click #close-modal': (event, instance) => {
    event.preventDefault();
    instance.dialog.close('share-response');
  },
});
