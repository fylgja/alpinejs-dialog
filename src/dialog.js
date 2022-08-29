export default function (Alpine) {
    Alpine.directive("dialog", fylgjaAlpineDialog);

    /**
     *
     * @param {HTMLDialogElement} el
     * @param {{ expression: boolean; modifiers: string[]; }} values
     * @param {{ evaluateLater: () =>; cleanup: () => void; }} functions
     */
    function fylgjaAlpineDialog(
        el,
        { expression, modifiers },
        { evaluateLater, cleanup }
    ) {
        const evaluate = evaluateLater(expression);
        const lockPageScroll = modifiers.includes("noscroll");

        el.style.display = null;
        el.hidden = false;

        /**
         * Handles scroll locking on the body
         *
         * @param {boolean} use
         */
        function scrollLock(use = true) {
            document.body.style.overflow = use ? "hidden" : "";
        }

        /**
         * Use Alpine to handle escape key instead of native event
         *
         * @param {KeyboardEvent} event
         */
        function escapeDialog(event) {
            if (event.key !== "Escape") return;
            evaluate();
        }

        /**
         * Handle case when backdrop is clicked
         *
         * @param {MouseEvent} event
         */
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

        el._x_doShow = () => {
            el.showModal();
            el.addEventListener("keydown", escapeDialog);
            el.addEventListener("click", backdropDialog);
            scrollLock(lockPageScroll);
        };

        el._x_doHide = () => {
            el.close();
            el.removeEventListener("keydown", escapeDialog);
            el.removeEventListener("click", backdropDialog);
            scrollLock(false);
        };

        cleanup(() => {
            el.removeEventListener("keydown", escapeDialog);
            el.removeEventListener("click", backdropDialog);
            scrollLock(false);
        });
    }
}
