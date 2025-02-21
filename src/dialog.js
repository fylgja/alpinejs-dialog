export default function (Alpine) {
    Alpine.directive("htmldialog", fylgjaAlpineDialog);

    function fylgjaAlpineDialog(
        el,
        { expression, modifiers },
        { evaluateLater, cleanup }
    ) {
        const evaluate = expression.length
            ? evaluateLater(expression)
            : () => {};
        const lockPageScroll = modifiers.includes("noscroll");

        // Remove any logic set by `x-show`
        el.style.display = null;
        el.hidden = false;
        el.style.length === 0 && el.removeAttribute("style");

        function scrollLock(use = true) {
            document.body.style.overflow = use ? "hidden" : "";
        }

        function escapeDialog(event) {
            if (event.key !== "Escape") return;
            event.preventDefault(); // prevent native escape
            evaluate();
        }

        function backdropDialog(event) {
            const rect = el.getBoundingClientRect();
            const isInDialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (isInDialog) return;
            evaluate();
        }

        function preventInvalidClose(event) {
            console.log('test if form is invalid.');
            const form = el.querySelector('form');
            if (form) {
                console.log('found a form', form);
            }
            if (form && !form.checkValidity()) {
                event.preventDefault(); // Prevent dialog close if form is invalid
                console.log('Form is invalid, preventing dialog close');
            }
        }

        el._x_doShow = () => {
            if (el.hasAttribute("open")) return;
            el.showModal();
            document.addEventListener("keydown", escapeDialog);
            el.addEventListener("click", backdropDialog);
            el.addEventListener("close", preventInvalidClose);
            console.log('added close event listener');
            scrollLock(lockPageScroll);
        };

        el._x_doHide = () => {
            if (!el.hasAttribute("open")) return;
            el.close();
            document.removeEventListener("keydown", escapeDialog);
            el.removeEventListener("click", backdropDialog);
            el.removeEventListener("close", preventInvalidClose);
            console.log("Removed close event listener");
            scrollLock(false);
        };

        cleanup(() => {
            document.removeEventListener("keydown", escapeDialog);
            el.removeEventListener("click", backdropDialog);
            el.removeEventListener("close", preventInvalidClose);
            scrollLock(false);
        });
    }
}
