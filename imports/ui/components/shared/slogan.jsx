import React, { Component } from 'react';
import Dialog from '../utils/dialog.js';
import 'dialog-polyfill/dialog-polyfill.css';

class Slogan extends Component {
  constructor(props) {
    super(props);
    this.dialog = new Dialog;
  }

  componentDidMount() {
    this.dialog.register([
      this.refs.share.id,
      this.refs.response.id,
    ]);
  }

  render() {
    return (
      <div className="slogan">
        <h1 className="text">
          <span>
            Anonymously&nbsp;&nbsp;
          </span>
          <a className="share-link" href="#" onClick={() => this.dialog.toggle('share-modal')}>
            SHARE&nbsp;&nbsp;
          </a>
          <span>
            your secret.&nbsp;&nbsp;
          </span>
        </h1>
        <dialog className="share-your big-link" id="share-modal" ref="share">
          <form id="form" method="post" action="">
            <textarea id="comments" className="common txtstuff"></textarea>
            <span className="counter">200</span>
            <input type="submit" name="share" value="share your secret" className="share" />
            <a className="close-reveal-modal" onClick={() => this.dialog.close('share-modal')}>
              &#215;
            </a>
          </form>
        </dialog>

        <dialog className="modal-response" id="share-response" ref="response">
          <div className="up-peace">
            <h1>Thanks for sharing.</h1>
            <h2>YOUR SECRET NOW LIVES HERE</h2>
            <h3><p>http://some-url</p><a id="copy-text" href="#">COPY</a></h3>
            <p>...and is in the cue for inclusion on the home screen</p>
          </div>
          <div className="down-peace">
            <ul>
              <li><a id="go-sign-up" href="#">Subscribe by email</a></li>
              <li><a href="/secrets">browse secrets</a></li>
              <li><a id="share-another" href="#">share another</a></li>
            </ul>
          </div>
          <a className="close-reveal-modal" onClick={() => this.dialog.close('share-response')}>
            &#215;
          </a>
        </dialog>
      </div>
    );
  }
}

export default Slogan;
