# Fylgja - AlpineJS Dialog

[![NPM version](https://img.shields.io/npm/v/@fylgja/alpinejs-dialog?logo=npm)](https://www.npmjs.com/package/@fylgja/alpinejs-dialog)
[![License](https://img.shields.io/github/license/fylgja/alpinejs-dialog?color=%23234)](/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f6d1c1a3-2365-4d56-aeb4-ec52bcc7c1b6/deploy-status)](https://alpinejs-dialog.netlify.app/)

Bring the power and simplicity of Alpine.js to the native HTML `<dialog>` element.

**Live Demo:** https://alpinejs-dialog.netlify.app/

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

## Usage

To utilize the `x-htmldialog` plugin, add the directive to an HTML `<dialog>` element that is also controlled by `x-show`.

```html
<div x-data="{ open: false }">
    <button @click="open = !open">Open</button>
    <dialog x-show="open" x-htmldialog="open = false">..</dialog>
</div>
```

When the `x-htmldialog` directive is present on an `x-show` element:

- It prevents `x-show` from directly toggling the display style.
- Instead, it uses the native `el.showModal()` function to display the dialog.
- The optional value provided to `x-htmldialog` (e.g., `"open = false"`) is executed
  when the dialog is closed by pressing the Escape key or clicking outside the dialog (the backdrop).

### Modifiers

The `x-htmldialog` directive supports modifiers to further customize its behavior.

#### `noscroll`

The `noscroll` modifier prevents scrolling on the background page while the dialog is open.

```html
<div x-data="{ open: false }">
    <button @click="open = !open">Open</button>
    <dialog x-show="open" x-htmldialog.noscroll="open = false">..</dialog>
</div>
```

#### `closeby`

The `closeby` modifier allows you to control which events trigger the close action
defined in the `x-htmldialog` value (backdrop click and/or Escape key press).

This mimics the upcoming native `closeby` behavior of the `<dialog>` element.

Available options for the `closeby` modifier:

- `.auto` (Same as `.closerequest`). Only triggers the close action on the Escape key press.
- `.none` Disables all automatic close triggers (backdrop click and Escape key).
- `.closerequest` Only triggers the close action on the Escape key press.
- `.any` (Default behavior if no `closeby` modifier is present).
  Triggers the close action on both backdrop clicks and Escape key presses.

Example, for disable all automatic closing:

```html
<dialog x-show="open" x-htmldialog.closeby.none="open = false">...</dialog>
```

This way you can keep the close trigger for form submissions and prevent any other close triggers.
