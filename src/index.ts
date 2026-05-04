import { getAttribute, getDefaultKeyValueStore, hasAttribute } from "@lesjoursfr/browser-tools";
import en from "./lang/en.js";
import { MastodonShareButtonsLang, MastodonShareButtonsOptions } from "./options.js";
import { MastodonShareModal } from "./ui/modal.js";

export type { MastodonShareButtonsLang, MastodonShareButtonsOptions };

const store = getDefaultKeyValueStore(31); // 31 days

export class MastodonShareButtons {
  private lang: MastodonShareButtonsLang;
  private buttons: NodeListOf<HTMLElement> | HTMLElement[];
  private saveInstance: boolean;
  private savedInstanceUrl: string | null;
  private modal: MastodonShareModal | undefined;

  /**
   * Initialize the Mastodon Share Buttons module.
   * @constructor
   * @param {MastodonShareButtonsOptions} options - Options for the Mastodon Share Buttons.
   */
  constructor(options: Partial<MastodonShareButtonsOptions> = {}) {
    // Set the lang (default to english)
    this.lang = options.lang ?? en;

    // Check if there is a selector for buttons
    // If there is no selector we listen clicks events on the body
    this.buttons = typeof options.selector === "string" ? document.querySelectorAll(options.selector) : [document.body];

    // Check if we have to set a cookie to memorize the instance
    this.saveInstance = options.saveInstance === true;
    this.savedInstanceUrl = this.saveInstance === true ? (store.getItem("mastodonInstance") ?? null) : null;

    // Listen click events on buttons
    for (const button of this.buttons) {
      button.addEventListener("click", this.onClick.bind(this));
    }
  }

  /**
   * Click event listener
   * @param {MouseEvent} event
   */
  public onClick(event: MouseEvent): void {
    // Check if the element (or one of it's parents) has a mastodon-sharing-text attribute
    let target = event.target as HTMLElement | null;
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
  }

  /**
   * Mastodon modal confirmation callback
   * @param {string} editedMessage
   * @param {string} selectedInstance
   */
  public onConfirmation(editedMessage: string, selectedInstance: string): void {
    // Update the saved Mastodon Instance if we can
    if (this.saveInstance) {
      this.savedInstanceUrl = selectedInstance;
      store.setItem("mastodonInstance", this.savedInstanceUrl);
    }

    // Open the URL in a new tab
    window.open(`${selectedInstance}/share?text=${encodeURIComponent(editedMessage)}`, "_blank");
  }

  /**
   * Mastodon modal close callback
   */
  public onClose(): void {
    this.modal = undefined;
  }
}
