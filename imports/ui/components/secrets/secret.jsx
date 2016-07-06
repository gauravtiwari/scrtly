import React, { Component } from 'react';

// Secret Component
class Secret extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { secret } = this.props;

    return (
      <div className="secret-box">
        <div className="inner-box">
          <section className="secret-content" id="back-1">
            <p>{secret.body}</p>
              <div className="reactionPrompt">
                <div className="underline">
                  <label for="comment">This is</label>
                  <input type="text" name="comment" placeholder="Enter comment" />
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
    );
  }
}

Secret.propTypes = {
  secret: React.PropTypes.object,
};

export default Secret;
