import { Template } from 'meteor/templating';

// Templates
import './slogan.html';
import '../../modals/share.js';
import '../../modals/response.js';
import Dialog from '../../../utils/dialog.js';


Template.slogan.onCreated(function secretOnCreated() {
  this.dialog = new Dialog;
});

Template.slogan.events({
  'click #toggle-share-secret': (event, instance) => {
    event.preventDefault();
    instance.dialog.register([
      instance.$('share-modal'),
      instance.$('share-response'),
    ]);
    instance.dialog.toggle('share-modal');
  },
});
