/* eslint no-unused-vars: 0 */
/* eslint no-underscore-dangle: 0 */

import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-apollo';
import gql from 'apollo-client/gql';

// Child Components
import Header from './components/shared/header';

class App extends Component {
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

  render() {
    return (
    <div id="container" className="clearfix">
    <div className="container">

      <Header />

      <div id="content">
        <div className="inner-content">
          <div className="secret-box">
            <div className="inner-box">
              <section className="secret-content" id="back-1">
                <p>This is secret text</p>
                  <div className="reactionPrompt">
                    <div className="underline">
                      <label for="comment">This is</label>
                      <input type="text" data-secret="id" name="comment" className="comment" placeholder="" id="comment" />
                    </div>
                  </div>
              </section>

              <div className="comment-section clearfix">
                <div className="sideContent">
                  <div className="socialContainer">
                      <a href="https://www.facebook.com/dialog/feed?
                      app_id=294770120653592&
                      link=http://scrt.ly/&
                      picture=img/welcome_email/welcome-bg.jpg&
                      name=Scrt.ly&display=popup&
                      description=this is share text&
                      redirect_uri=http://scrt.ly/" id="facebook" target="blank"></a>

                      <a href="https://twitter.com/intent/tweet?url=http://www.scrt.ly&text=this is secret text&via=scrtly&lang=en" id="twitter"></a>
                  </div>
                  <a href="#" className="daily-secret">SUBSCRIBE</a>
                </div>


                <div className="message" id="message-secret-id"></div>
                <ul className="comment-list" id="secret-secret-id">
                  <li><p>Someone thought this was <span>funny, hilarious</span></p></li>
                  <li><p>You thought this was <span>funny, hilarious</span></p></li>
                </ul>

                <div className="clearfix"></div>
                <br clear="all" />
                <a className="comment-number" data-count="200" href="#">
                  <span>200</span> reactions
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="privacy modalStyle big-link" id="myModal">
        <h1>Your secrets are safe with us.</h1>
        <h2>WHEN YOU SUBMIT A SECRET:</h2>
        <p>We don't ask for your name...</p>
        <p>We don't ask for your email address...</p>
        <p>We don't track your computer address...</p>
        <h3>We have no idea who you are, and we don't care.</h3>
        <button><a href="mailto: someemail@email.com">talk to us</a></button>
        <a className="close-reveal-modal">&#215;</a>
      </div>


      <div className="about-us modalStyle big-link" id="myModaliii">
        <h1>Catharsis & Connection</h1>
        <p>The year is 1999. I am home from college. It is 3am, and I am sitting at my family's computer. </p>
        <p>The glow from the screen is the only light in an otherwise dark study. I am anonymous. And I am reading another anonymous person's story about her life-long regret of having an abortion when she was sixteen. </p>
        <p>The comments on the post expose a sense of empathy and support from other readers. The experience invokes a sense of hope and wonder within me.</p>
        <p>At this moment in time, the internet feels like amorphous, uncharted territory, a nebulous, infinite landscape, serving as a haphazard community space for people's inner worlds. </p>
        <p>The power and benefit of anonymity unleashed. Catharsis for us to share private thoughts we otherwise never do. Connection through personal, intimate stories. </p>
        <p>But the importance of that type of space quickly fades. </p>
        <p>As the internet races towards identification, verification, and perpetual tracking, it forsakes anonymity. A vital organ of the internet cannibalized, and with it that community space for our inner life.</p>
        <p>Scrt.ly is determined to reinvigorate that arena.</p>
        <a className="close-reveal-modal">&#215;</a>
      </div>
    </div>

    <div className="scroll-more">
      <a href="#" className="prev-secret"></a>
      <a href="#" className="next-secret"></a>
    </div>


    <div id="controls-wrapper" className="load-item">
      <div id="controls">
        <div id="slidecaption"></div>

        <div id="bottomNav">
          <a id="privacy" href="#" data-reveal-id="myModal">privacy</a>
          <a href="#" id="about-us" data-reveal-id="myModaliii">about scrt.ly</a>
        </div>
      </div>
      </div>

    </div>
    );
  }
}

// This container brings in Apollo GraphQL data
const AppWithData = connect({
  mapQueriesToProps({ ownProps }) {
    return {
      posts: {
        query: gql`
          query {
            allPosts {
              _id
              body
              ip
              comments {
                _id
                ip
                body
              }
            }
          }
        `,
      },
    };
  },
})(App);

export default AppWithData;
