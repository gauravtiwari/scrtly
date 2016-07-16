/* eslint no-unused-vars: 0 */
/* eslint no-underscore-dangle: 0 */

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import $ from 'jquery';

// Collections
import { Posts } from '../api/collections/posts.js';

// Child Components
import Header from './components/shared/header.jsx';
import Footer from './components/shared/footer.jsx';
import Secret from './components/secrets/secret.jsx';

import 'spinkit/css/spinkit.css';

const loaderStyle = {
  margin: '20% auto',
  width: '50px',
  height: '40px',
  textAlign: 'center',
  fontSize: '10px',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.state = {
      page: 10,
    };
  }

  componentDidMount() {
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


  renderLoading() {
    return (
      <div className="loading-container">
        <div className="sk-wave" style={loaderStyle}>
          <div className="sk-rect sk-rect1"></div>
          <div className="sk-rect sk-rect2"></div>
          <div className="sk-rect sk-rect3"></div>
          <div className="sk-rect sk-rect4"></div>
          <div className="sk-rect sk-rect5"></div>
        </div>
      </div>
    );
  }

  renderMain() {
    return (
      <div id="main-content">
        <div className="inner-content">
          {this.props.posts.map((post) => (
            <Secret key={post._id} secret={post} />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    const renderSecrets = loading ? this.renderLoading() : this.renderMain();

    return (
    <div id="container" className="clearfix">
      <div className="container">
        <Header />
        {renderSecrets}
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
  posts: React.PropTypes.array,
};

// Data container for the APP
const AppContainer = createContainer((props) => {
  const postsHandle = Meteor.subscribe('posts', 20);
  const loading = !postsHandle.ready();
  const posts = Posts.find();
  const hasPosts = !loading && !!posts;
  return {
    loading: loading,
    hasPosts,
    posts: hasPosts ? posts.fetch() : [],
  };
}, App);

export default AppContainer;
