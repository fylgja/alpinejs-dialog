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

The `closeby` option gives you fine-grained control over how the dialog can be dismissed. The plugin polyfills this behavior for browsers that do not yet support it natively.

You can set this option in two ways:

**1. As an attribute on the `<dialog>` element:**
```html
<dialog closeby="any" ...>
```

**2. As a modifier on the `x-htmldialog` directive:**
```html
<dialog x-htmldialog.closeby.any ...>
```

#### Available Options

* **`any`**: The dialog can be closed by any user action, such as pressing the `ESC` key or clicking on the backdrop.
* **`closerequest`**: (Default) The dialog can be dismissed via the `ESC` key or a "close request" (e.g., a form submission with `method="dialog"`). It will not close when the backdrop is clicked.
* **`none`**: The user cannot close the dialog. It must be closed programmatically.

