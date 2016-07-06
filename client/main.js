import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

require('vegas');
import 'vegas/dist/vegas.css';

import AppContainer from '../imports/ui/App.jsx';
Meteor.startup(() => {
  mount(AppContainer);
});
