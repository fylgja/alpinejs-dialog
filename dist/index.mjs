// src/dialog.js
function dialog_default(Alpine) {
  Alpine.directive("htmldialog", fylgjaAlpineDialog);
  function fylgjaAlpineDialog(el, { expression, modifiers }, { evaluateLater, cleanup }) {
    const evaluate = expression.length ? evaluateLater(expression) : () => {
    };
    const lockPageScroll = modifiers.includes("noscroll");
    el.style.display = null;
    el.hidden = false;
    el.style.length === 0 && el.removeAttribute("style");
    el.addEventListener("keydown", escapeDialog);
    el.addEventListener("mousedown", backdropDialog);
    el.addEventListener("submit", methodDialog);
    function scrollLock(use = true) {
      document.body.style.overflow = use ? "hidden" : "";
    }
    function methodDialog(event) {
      if (event.target.getAttribute("method") === "dialog" || event.submitter && event.submitter.getAttribute("formmethod") === "dialog") {
        evaluate();
      }
    }
    function escapeDialog(event) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      evaluate();
    }
    function backdropDialog(event) {
      const rect = el.getBoundingClientRect();
      const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
      if (isInDialog) return;
      evaluate();
    }
    el._x_doShow = () => {
      if (el.hasAttribute("open")) return;
      el.showModal();
      scrollLock(lockPageScroll);
    };
    el._x_doHide = () => {
      if (!el.hasAttribute("open")) return;
      el.close();
      scrollLock(false);
    };
    cleanup(() => {
      el.removeEventListener("keydown", escapeDialog);
      el.removeEventListener("mousedown", backdropDialog);
      el.removeEventListener("submit", methodDialog);
      scrollLock(false);
    });
  }
}

// src/module.js
var module_default = dialog_default;
export {
  module_default as default
};
