[![npm version](https://badge.fury.io/js/@lesjoursfr%2Fmastodon-share-button.svg)](https://badge.fury.io/js/@lesjoursfr%2Fmastodon-share-button)
[![QC Checks](https://github.com/lesjoursfr/mastodon-share-button/actions/workflows/quality-control.yml/badge.svg)](https://github.com/lesjoursfr/mastodon-share-button/actions/workflows/quality-control.yml)

# @lesjoursfr/mastodon-share-button

Simple module to share content to Mastodon.

# How to use

```javascript
import MastodonShareButtons from "@lesjoursfr/mastodon-share-button";
import mastodonShareButtonsFr from "@lesjoursfr/mastodon-share-button/src/lang/fr";

/* Initialize the module */
new MastodonShareButtons({
	lang: mastodonShareButtonsFr,
	saveInstance: true,
});
```

```html
<!-- Create a button -->
<button
	mastodon-sharing-text="Mastodon sharing button! https://github.com/lesjoursfr/mastodon-share-button"
>
	Share on Mastodon
</button>
```
