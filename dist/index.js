(() => {
  // src/dialog.js
  function dialog_default(Alpine) {
    Alpine.directive("htmldialog", fylgjaAlpineDialog);
    function fylgjaAlpineDialog(el, { expression, modifiers }, { evaluateLater, cleanup }) {
      const evaluate = expression.length ? evaluateLater(expression) : () => {
      };
      const canEvaluate = expression.length > 0;
      const lockPageScroll = modifiers.includes("noscroll");
      const closeBy = el.hasAttribute("closeby") ? el.getAttribute("closeby") : modifierValue(modifiers, "closeby", "closerequest");
      el.style.display = null;
      el.style.length === 0 && el.removeAttribute("style");
      if (el._x_isShown) {
        open();
      }
      const closeBySupported = (() => {
        return "closedBy" in HTMLDialogElement.prototype;
      })();
      function scrollLock(use = true) {
        document.body.style.overflow = use ? "hidden" : "";
      }
      function dialogSubmit(event) {
        if ((event.target.getAttribute("method") === "dialog" || event.submitter?.getAttribute("formmethod") === "dialog") && !canEvaluate) {
          event.preventDefault();
        }
      }
      function escapeDialog(event) {
        if (event.key === "Escape" && !canEvaluate) {
          event.preventDefault();
        }
      }
      function handleCloseByEvent(event) {
        if (event.target !== el) return;
        const rect = el.getBoundingClientRect();
        const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          if (closeBy === "any") {
            if (closeBySupported) {
              event.preventDefault();
            }
            evaluate();
          }
        }
      }
      function handleCloseEvent() {
        evaluate();
      }
      function open() {
        if (el.hasAttribute("open")) return;
        el.showModal();
        scrollLock(lockPageScroll);
      }
      function close() {
        if (!el.hasAttribute("open")) return;
        el.close();
        scrollLock(false);
      }
      el._x_doShow = () => open();
      el._x_doHide = () => close();
      el.addEventListener("keydown", escapeDialog);
      el.addEventListener("submit", dialogSubmit);
      el.addEventListener("click", handleCloseByEvent);
      el.addEventListener("cancel", handleCloseEvent);
      cleanup(() => {
        el.removeEventListener("keydown", escapeDialog);
        el.removeEventListener("submit", dialogSubmit);
        el.removeEventListener("click", handleCloseByEvent);
        el.removeEventListener("cancel", handleCloseEvent);
        scrollLock(false);
      });
    }
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1) return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;
    if (key === "closeby") {
      const allowedValues = ["auto", "none", "closerequest", "any"];
      const options = allowedValues.join(", ");
      if (!allowedValues.includes(rawValue)) {
        console.warn(
          `"${rawValue}" is not one of the allowed values for closeby: ${options}`
        );
        return fallback;
      }
    }
    return rawValue;
  }

  // src/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(dialog_default);
  });
})();
