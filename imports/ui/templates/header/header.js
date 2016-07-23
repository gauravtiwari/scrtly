import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './header.html';
import './logo/logo.js';
import './menu/menu.js';
import './slogan/slogan.js';

Template.menu.events({
  'click #toggle-subscribe': (event) => {
    event.preventDefault();
    const instance = Template.instance();
    $(instance.$('.dropdown')).toggleClass('active');
  },
});
