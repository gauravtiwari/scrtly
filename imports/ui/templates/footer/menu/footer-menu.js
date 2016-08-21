import './footer-menu.html';
import { Template } from 'meteor/templating';
import Dialog from '../../../utils/dialog.js';

Template.footerMenu.onCreated(function footerMenuOnCreated() {
  this.dialog = new Dialog;
});


Template.footerMenu.events({
  'click #toggle-privacy-modal': (event, instance) => {
    event.preventDefault();
    instance.dialog.toggle('privacy-modal');
  },

  'click #toggle-about-modal': (event, instance) => {
    event.preventDefault();
    instance.dialog.toggle('about-modal');
  },
});
