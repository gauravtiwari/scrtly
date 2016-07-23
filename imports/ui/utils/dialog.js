import dialogPolyfill from 'dialog-polyfill';

export default class Dialog {
  register(dialogIds) {
    dialogIds.map((dialogId) => {
      const dialog = this.get(dialogId);
      if (typeof HTMLDialogElement !== 'function') {
        dialogPolyfill.registerDialog(dialog);
        dialogPolyfill.registerDialog(dialog);
      }
      return dialog;
    });
  }

  get(dialogId) {
    return document.getElementById(dialogId);
  }

  close(dialogId) {
    const dialog = this.get(dialogId);
    if (dialog.open) {
      dialog.close();
      document.body.classList.remove('dialog-open');
    }
  }

  toggle(dialogId) {
    const dialog = this.get(dialogId);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
}
