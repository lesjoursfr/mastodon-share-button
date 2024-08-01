import Cookies from "js-cookie";
import { getAttribute, hasAttribute } from "./core/dom.js";
import MastodonShareModal from "./ui/modal.js";
import en from "./lang/en.js";

/**
 * Initialize the Mastodon Share Buttons module.
 * @constructor
 * @param {Object} options - Options for the Mastodon Share Buttons.
 */
function MastodonShareButtons(options) {
  // Set the lang (default to english)
  this.lang = options.lang ?? en;

  // Check if there is a selector for buttons
  // If there is no selector we listen clicks events on the body
  this.buttons = typeof options.selector === "string" ? document.querySelectorAll(options.selector) : [document.body];

  // Check if we have to set a cookie to memorize the instance
  this.saveInstance = options.saveInstance === true;
  this.savedInstanceUrl = this.saveInstance === true ? (Cookies.get("mastodonInstance") ?? null) : null;

  // Listen click events on buttons
  for (const button of this.buttons) {
    button.addEventListener("click", this.onClick.bind(this));
  }
}

/**
 * Click event listener
 * @param {MouseEvent} event
 */
MastodonShareButtons.prototype.onClick = function (event) {
  // Check if the element (or one of it's parents) has a mastodon-sharing-text attribute
  let target = event.target;
  while (target !== null && !hasAttribute(target, "mastodon-sharing-text")) {
    target = target.parentElement;
  }
  if (target === null) {
    // This is not for us
    return;
  }

  // Prevent default
  event.preventDefault();

  // Don't open a modal twice
  if (this.modal !== undefined) {
    return;
  }

  // Get the text message
  const textMessage = getAttribute(target, "mastodon-sharing-text");

  // Show the modal to the user
  this.modal = new MastodonShareModal({
    lang: this.lang,
    text: textMessage,
    instance: this.savedInstanceUrl,
    onConfirmation: this.onConfirmation.bind(this),
    onClose: this.onClose.bind(this),
  });
  this.modal.show();
};

/**
 * Mastodon modal confirmation callback
 * @param {String} editedMessage
 * @param {String} selectedInstance
 */
MastodonShareButtons.prototype.onConfirmation = function (editedMessage, selectedInstance) {
  // Update the saved Mastodon Instance if we can
  if (this.saveInstance) {
    this.savedInstanceUrl = selectedInstance;
    Cookies.set("mastodonInstance", this.savedInstanceUrl, { expires: 31 }); // 31 days
  }

  // Open the URL in a new tab
  window.open(`${selectedInstance}/share?text=${encodeURIComponent(editedMessage)}`, "_blank");
};

/**
 * Mastodon modal close callback
 */
MastodonShareButtons.prototype.onClose = function () {
  this.modal = undefined;
};

export default MastodonShareButtons;
