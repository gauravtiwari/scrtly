import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../imports/ui/layouts/app-container.js';
import '../imports/ui/pages/secret-list.js';

import $ from 'jquery';
import 'vegas';

$('body').vegas({
  slides: [
    {
      src: 'uploads/705962584974898b17dd7fba25c160bed985b08b.jpg',
      title: 'IMAGE CREDIT <a href="mailto:">Adi</a>',
    },
    {
      src: 'uploads/6383e801c40b17cadf5104fccad8de1144d96153.jpg',
      title: 'IMAGE CREDIT <a href="mailto:">Adi</a>',
    },
    {
      src: 'uploads/a6a3f176d32a49a657bc5d8dd90e3adfc914d3a5.jpg',
      title: 'IMAGE CREDIT <a href="mailto:">Adi</a>',
    },
  ],
});

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('appContainer', { main: 'secretList' });
  },
});
