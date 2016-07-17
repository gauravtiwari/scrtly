import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

require('vegas');
require('vegas/dist/vegas.css');

import AppContainer from '../imports/ui/App.jsx';
import AppRoute from '../imports/ui/routes/appRoute.js';
import Loading from '../imports/ui/components/shared/loading.jsx';
import Error from '../imports/ui/components/shared/error.jsx';

Meteor.startup(() => {
  ReactDOM.render(
    <Relay.Renderer
      Container={AppContainer}
      queryConfig={new AppRoute}
      environment={Relay.Store}
      render={({ props, error, retry }) => {
        if (props) {
          return (
            <AppContainer {...props} />
          );
        } else if (error) {
          return <Error retry={retry} />;
        }
        return <Loading />;
      }}
    />,
    document.getElementById('app')
  );
});
