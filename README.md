# Fylgja - AlpineJS Dialog

[![NPM version](https://img.shields.io/npm/v/@fylgja/alpinejs-dialog?logo=npm)](https://www.npmjs.com/package/fylgja)
[![License](https://img.shields.io/github/license/fylgja/alpinejs-dialog?color=%23234)](/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f6d1c1a3-2365-4d56-aeb4-ec52bcc7c1b6/deploy-status)](https://alpinejs-dialog.netlify.app/)

Bring the power of AlpineJs to the HTML dialog.

See it in action here https://alpinejs-dialog.netlify.app/

## Installation

You can use this plugin by either installing it using NPM or including it from a CDN.

### Via NPM

You can install it from NPM and include it in your bundle:

```bash
npm install @fylgja/alpinejs-dialog
```

```js
import Alpine from 'alpinejs';
import dialog from '@fylgja/alpinejs-dialog';

window.Alpine = Alpine;

Alpine.plugin(dialog);
Alpine.start();
```

### Via CDN

You can include the CDN version of this plugin as a `<script>` tag,
just make sure to include it before AlpineJs.

```html
<script defer src="https://unpkg.com/@fylgja/alpinejs-dialog/dist/index.min.js"></script>
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

## How to use

To use this, create an Alpine component for example, like;

```html
<div x-data="{ open: false }">
    <button @click="open = !open">Open</button>
    <dialog x-show="open" x-htmldialog="open = false">..</dialog>
</div>
```

When adding the `x-htmldialog` to an `x-show` element,
it will not toggle the display,
but instead use the native `el.showModal()` function.

The value inside the `x-htmldialog` is not required,
but is recommended to close the dialog using the escape key or clicking the backdrop.

### Modifiers

#### Scroll-lock

To lock the page scroll add the modifier `noscroll`;

```html
<div x-data="{ open: false }">
    <button @click="open = !open">Open</button>
    <dialog x-show="open" x-htmldialog.noscroll="open = false">..</dialog>
</div>
```

This will now prevent any scrolling on the page.
