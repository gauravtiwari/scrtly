import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import 'spinkit/css/spinkit.css';
import 'vegas/dist/vegas.css';
import './app-container.html';
import '../templates/header/header.js';
import '../templates/footer/footer.js';


Template.appContainer.events({
  'click #container': (event, instance) => {
    const dropdown = instance.$('.dropdown');
    const dropdownToggler = instance.$('#toggle-subscribe');
    // Return if clicked on dropdown or toggler
    if ($(event.target).is($(dropdownToggler))) return;
    if ($(event.target).is($(dropdown))) return;
    if ($(dropdown).has($(event.target)).length > 0) return;
    // Finally close the dropdown
    if ($(dropdown).hasClass('active')) {
      $(dropdown).removeClass('active');
    }
  },
});
