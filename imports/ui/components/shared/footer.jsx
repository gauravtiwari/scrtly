import React, { Component } from 'react';
import Dialog from '../utils/dialog.js';
import 'dialog-polyfill/dialog-polyfill.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.dialog = new Dialog;
  }

  componentDidMount() {
    this.dialog.register([
      this.refs.privacy.id,
      this.refs.about.id,
    ]);
  }

  render() {
    return (
      <div id="controls-wrapper" className="load-item">
        <div id="controls">
          <div id="slidecaption"></div>
          <div id="bottomNav">
            <a href="#" onClick={() => this.dialog.toggle('privacy-modal')}>
              privacy
            </a>
            <a href="#" onClick={() => this.dialog.toggle('about-modal')}>
              about scrt.ly
            </a>
          </div>
        </div>
          <dialog className="privacy modalStyle big-link" id="privacy-modal" ref="privacy">
            <h1>Your secrets are safe with us.</h1>
            <h2>WHEN YOU SUBMIT A SECRET:</h2>
            <p>We don't ask for your name...</p>
            <p>We don't ask for your email address...</p>
            <p>We don't track your computer address...</p>
            <h3>We have no idea who you are, and we don't care.</h3>
            <button><a href="mailto: someemail@email.com">talk to us</a></button>
            <a className="close-reveal-modal" onClick={() => this.dialog.close('privacy-modal')}>
              &#215;
            </a>
          </dialog>

          <dialog className="about-us modalStyle big-link" id="about-modal" ref="about">
            <h1>Catharsis & Connection</h1>
            <p>
              The year is 1999. I am home from college. It is 3am,
              and I am sitting at my family's computer.
            </p>
            <p>
              The glow from the screen is the only light in an otherwise dark study.
              I am anonymous.And I am reading another anonymous person's story
              about her life-long regret of having an abortion when she was sixteen.
            </p>
            <p>
              The comments on the post expose a sense of empathy and support
              from other readers. The experience invokes a sense of hope and
              wonder within me.
            </p>
            <p>
              At this moment in time, the internet feels like amorphous,
              uncharted territory, a nebulous, infinite landscape, serving
              as a haphazard community space for people's inner worlds.
            </p>
            <p>
              The power and benefit of anonymity unleashed. Catharsis for us
              to share private thoughts we otherwise never do.
              Connection through personal, intimate stories.
            </p>
            <p>But the importance of that type of space quickly fades. </p>
            <p>
              As the internet races towards identification, verification,
              and perpetual tracking, it forsakes anonymity. A vital organ of the
              internet cannibalized, and with it that community space for our inner life.
            </p>
            <p>Scrt.ly is determined to reinvigorate that arena.</p>
            <a className="close-reveal-modal" onClick={() => this.dialog.close('about-modal')}>
              &#215;
            </a>
          </dialog>
      </div>
    );
  }
}

export default Footer;
