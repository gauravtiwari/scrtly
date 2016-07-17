/* eslint no-underscore-dangle: 0 */

import React, { Component } from 'react';
import Relay from 'react-relay';
import { createContainer } from 'meteor/react-meteor-data';
import { Comments } from '../../../api/collections/comments';
import { Words } from '../../../api/collections/words';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

import Comment from '../comments/comment';

// Secret Component
class Secret extends Component {
  constructor() {
    super();
    this.resizeSecretBox = this.resizeSecretBox.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleSubscribe = this.toggleSubscribe.bind(this);
  }

  componentDidMount() {
    Meteor.subscribe('words', null);
    this.resizeSecretBox();
    $(window).resize(() => {
      this.resizeSecretBox();
    });
  }

  resizeSecretBox() {
    const height = $(window).height()
      - $('.secret-box').height() - $('header').height();

    $('.inner-box').css({
      'margin-top': height / 2,
      'margin-bottom': height,
    });
  }

  toggleComments(event) {
    event.preventDefault();
    const { comments, count } = this.refs;
    $(comments).toggleClass('active');
    if ($(comments).hasClass('active')) {
      $(count).text('Hide');
    } else {
      $(count).text(this.props.comments.length);
    }
  }

  toggleSubscribe(event) {
    event.preventDefault();
    $('.dropdown').toggleClass('active');
  }

  render() {
    const { secret, comments } = this.props;

    return (
      <div className="secret-box">
        <div className="inner-box">
          <section className="secret-content" id="back-1">
            <p>{secret.body}</p>
            <div className="reactionPrompt">
              <div className="underline">
                <label htmlFor="comment">This is</label>
                <input type="text" name="comment" placeholder="Enter comment" />
              </div>
            </div>
          </section>

          <div className="comment-section clearfix" ref="comments">
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
              <a onClick={this.toggleSubscribe} className="daily-secret">SUBSCRIBE</a>
            </div>


            <div className="message" id="message-secret-id"></div>
            <ul className="comment-list">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>

            <div className="clearfix"></div>
            <br />
          </div>
          <a className="comment-number" onClick={this.toggleComments}>
            <span ref="count">{comments.length}</span> reactions
          </a>
        </div>
      </div>
    );
  }
}

Secret.propTypes = {
  secret: React.PropTypes.object,
};

const SecretContainer = Relay.createContainer(Secret, {
  fragments: {
    secret: () => Relay.QL`
      fragment on Post {
        id,
        body,
      }
    `,
  },
});

export default SecretContainer;
