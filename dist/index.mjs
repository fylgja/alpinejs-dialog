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
export {
  module_default as default
};
