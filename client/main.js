import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';

require('vegas');
import 'vegas/dist/vegas.css';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from '../imports/ui/App';

const networkInterface = createNetworkInterface('/graphql');

const client = new ApolloClient({
  networkInterface,
});

Meteor.startup(() => {
  render(<ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('app'));
});
