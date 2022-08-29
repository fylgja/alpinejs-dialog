var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// src/dialog.js
function dialog_default(Alpine) {
  Alpine.directive("dialog", fylgjaAlpineDialog);
  function fylgjaAlpineDialog(el, { expression, modifiers }, { evaluateLater, cleanup }) {
    const evaluate = evaluateLater(expression);
    const lockPageScroll = modifiers.includes("noscroll");
    const hasBackdropClose = !modifiers.includes("noclickaway");
    const hasEscapeClose = !modifiers.includes("noescape");
    el.style.display = null;
    el.hidden = false;
    function scrollLock(use = true) {
      document.body.style.overflow = use ? "hidden" : "";
    }
    function escapeDialog(event) {
      if (event.key !== "Escape")
        return;
      event.preventDefault();
      hasEscapeClose && evaluate();
    }
    function backdropDialog(event) {
      const rect = el.getBoundingClientRect();
      const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
      if (isInDialog)
        return;
      evaluate();
    }
    el._x_doShow = () => {
      if (el.hasAttribute("open"))
        return;
      el.showModal();
      document.addEventListener("keydown", escapeDialog);
      hasBackdropClose && el.addEventListener("click", backdropDialog);
      scrollLock(lockPageScroll);
    };
    el._x_doHide = () => {
      if (!el.hasAttribute("open"))
        return;
      el.close();
      document.removeEventListener("keydown", escapeDialog);
      hasBackdropClose && el.removeEventListener("click", backdropDialog);
      scrollLock(false);
    };
    cleanup(() => {
      document.removeEventListener("keydown", escapeDialog);
      hasBackdropClose && el.removeEventListener("click", backdropDialog);
      scrollLock(false);
    });
  }
}

// src/module.js
var module_default = dialog_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
