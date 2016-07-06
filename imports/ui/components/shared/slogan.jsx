import React, { Component } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

class Slogan extends Component {
  constructor(props) {
    super(props);
    this.toggleShareModal = this.toggleShareModal.bind(this);
    this.shareDialog = this.shareDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.responseDialog = this.responseDialog.bind(this);
  }

  componentDidMount() {
    if (typeof HTMLDialogElement !== 'function') {
      dialogPolyfill.registerDialog(this.shareDialog());
      dialogPolyfill.registerDialog(this.responseDialog());
    }
  }

  shareDialog() {
    return document.getElementById(this.refs.share.id);
  }

  responseDialog() {
    return document.getElementById(this.refs.response.id);
  }

  toggleShareModal(event) {
    event.preventDefault();
    this.shareDialog().showModal();
    document.body.classList.add('dialog-open');
  }

  toggleResponseModal() {
    this.responseDialog().showModal();
    document.body.classList.add('dialog-open');
  }

  closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog.open) {
      dialog.close();
      document.body.classList.remove('dialog-open');
    }
  }

  render() {
    return (
      <div className="slogan">
        <h1>
          <span>
            Anonymously
          </span>
          <a href="#" onClick={this.toggleShareModal}>
            SHARE
          </a>
          <span>
            your secret.
          </span>
        </h1>
        <dialog className="share-your big-link" id="share-modal" ref="share">
          <form id="form" method="post" action="">
            <textarea id="comments" className="common txtstuff"></textarea>
            <span className="counter">200</span>
            <input type="submit" name="share" value="share your secret" className="share" />
            <a className="close-reveal-modal" onClick={() => this.closeDialog('share-modal')}>
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
          <a className="close-reveal-modal" onClick={() => this.closeDialog('share-response')}>
            &#215;
          </a>
        </dialog>
      </div>
    );
  }
}

export default Slogan;
