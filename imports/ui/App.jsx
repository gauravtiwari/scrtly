/* eslint no-unused-vars: 0 */
/* eslint no-underscore-dangle: 0 */

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Relay from 'react-relay';
import { createContainer } from 'meteor/react-meteor-data';
import $ from 'jquery';

// Collections
import { Posts } from '../api/collections/posts.js';

// Child Components
import Header from './components/shared/header.jsx';
import Footer from './components/shared/footer.jsx';
import Secret from './components/secrets/secret.jsx';
import Comment from './components/comments/comment.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this._handleScrollLoad = this._handleScrollLoad.bind(this);
    this.state = {
      page: 10,
      loading: false,
      done: false,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScrollLoad);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScrollLoad);
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
  }

  _handleScrollLoad() {
    if ( $(window).scrollTop() > $(document).height() - $(window).height() - 200 && !this.state.loading) {
      if(true) {
        console.log(this.props.relay.variables.count);
        this.setState({
          loading: true,
        });
        this.props.relay.setVariables({
          count: this.props.relay.variables.count + 20
        }, readyState => {
          if (readyState.done) {
            this.setState({
              loading: false,
            })
          }
        });
        this.props.relay.forceFetch();
        console.log(this.props.relay.variables.count);
      } else {
        if (!this.state.done) {
          this.setState({
            done: true,
          });
        }
      }
    }
  }


  render() {
    const { viewer } = this.props;
    return (
    <div id="container" className="clearfix">
      <div className="container">
        <Header />
        <div id="main-content">
          <div className="inner-content">
            {viewer.posts.edges.map(({ node }) => (
              <Secret key={node.id} secret={node} comments={node.comments} />
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-more">
        <a href="#" className="prev-secret"></a>
        <a href="#" className="next-secret"></a>
      </div>
      <Footer />
    </div>
    );
  }
}

App.propTypes = {
  viewer: React.PropTypes.object,
};

const AppContainer = Relay.createContainer(App, {
  initialVariables: {
    count: 20,
    next: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        posts(first: $count, after: $next) {
          edges {
            cursor,
            node {
              id,
              ${Secret.getFragment('secret')},
              comments {
                id,
                ${Comment.getFragment('comment')}
              },
            },
          },
          pageInfo {
            hasNextPage
          },
        },
      }
    `,
  },
});

export default AppContainer;
