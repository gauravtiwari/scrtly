import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

require('vegas');
require('vegas/dist/vegas.css');

import AppContainer from '../imports/ui/App.jsx';
Meteor.startup(() => {
  mount(AppContainer);
});
