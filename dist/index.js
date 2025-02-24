(() => {
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
      function scrollLock(use = true) {
        document.body.style.overflow = use ? "hidden" : "";
      }
      function escapeDialog(event) {
        if (event.key !== "Escape")
          return;
        event.preventDefault();
        evaluate();
      }
      function backdropDialog(event) {
        const rect = el.getBoundingClientRect();
        const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
        if (isInDialog)
          return;
        evaluate();
      }
      function preventInvalidClose(event) {
        console.log("test if form is invalid.");
        const form = el.querySelector("form");
        if (form) {
          console.log("found a form", form);
        }
        if (form && !form.checkValidity()) {
          event.preventDefault();
          console.log("Form is invalid, preventing dialog close");
        }
      }
      function handleEnterKey(event) {
        console.log("key pressed");
        if (event.key === "Enter") {
          console.log("key pressed - key was enter");
          const form = el.querySelector("form");
          if (form && !form.checkValidity()) {
            event.preventDefault();
            console.log("Enter key pressed, form is invalid, preventing dialog close");
          } else {
            console.log("key pressed - key was enter - form exists and looks good");
          }
        }
      }
      el._x_doShow = () => {
        if (el.hasAttribute("open"))
          return;
        el.showModal();
        document.addEventListener("keydown", escapeDialog);
        el.addEventListener("click", backdropDialog);
        el.addEventListener("close", preventInvalidClose);
        el.addEventListener("keydown", handleEnterKey);
        console.log("added close event listener");
        scrollLock(lockPageScroll);
      };
      el._x_doHide = () => {
        if (!el.hasAttribute("open"))
          return;
        el.close();
        document.removeEventListener("keydown", escapeDialog);
        el.removeEventListener("click", backdropDialog);
        el.removeEventListener("close", preventInvalidClose);
        el.removeEventListener("keydown", handleEnterKey);
        console.log("Removed close event listener");
        scrollLock(false);
      };
      cleanup(() => {
        document.removeEventListener("keydown", escapeDialog);
        el.removeEventListener("click", backdropDialog);
        el.removeEventListener("close", preventInvalidClose);
        el.removeEventListener("keydown", handleEnterKey);
        console.log("Removed close event listener");
        scrollLock(false);
      });
    }
  }

  // src/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(dialog_default);
  });
})();
