export type MastodonShareButtonsLang = {
  toot: string;
  cancel: string;
  message: string;
  instance: string;
};

export type MastodonShareButtonsOptions = {
  lang: MastodonShareButtonsLang;
  selector: string;
  saveInstance: boolean;
};
