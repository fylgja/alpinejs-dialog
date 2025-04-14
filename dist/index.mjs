// src/dialog.js
function dialog_default(Alpine) {
  Alpine.directive("htmldialog", fylgjaAlpineDialog);
  function fylgjaAlpineDialog(el, { expression, modifiers }, { evaluateLater, cleanup }) {
    const evaluate = expression.length ? evaluateLater(expression) : () => {
    };
    const lockPageScroll = modifiers.includes("noscroll");
    const closeby = modifierValue(modifiers, "closeby", "any");
    el.style.display = null;
    el.hidden = false;
    el.style.length === 0 && el.removeAttribute("style");
    el.addEventListener("keydown", escapeDialog);
    el.addEventListener("click", backdropDialog);
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
      if (event.key !== "Escape")
        return;
      event.preventDefault();
      if (closeby !== "any" && closeby !== "closerequest")
        return;
      evaluate();
    }
    function backdropDialog(event) {
      if (event.target !== el || closeby !== "any")
        return;
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
      scrollLock(lockPageScroll);
    };
    el._x_doHide = () => {
      if (!el.hasAttribute("open"))
        return;
      el.close();
      scrollLock(false);
    };
    cleanup(() => {
      el.removeEventListener("keydown", escapeDialog);
      el.removeEventListener("click", backdropDialog);
      el.removeEventListener("submit", methodDialog);
      scrollLock(false);
    });
  }
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "closeby") {
    const allowedValues = ["auto", "none", "closerequest", "any"];
    const options = allowedValues.join(", ");
    if (!allowedValues.includes(rawValue)) {
      console.warn(
        `"${rawValue}" is not one of the allowed values for closeby: ${options}`
      );
    }
    return fallback;
  }
  return rawValue;
}

// src/module.js
var module_default = dialog_default;
export {
  module_default as default
};
