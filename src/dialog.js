export default function (Alpine) {
    Alpine.directive("dialog", fylgjaAlpineDialog);

    function fylgjaAlpineDialog(
        el,
        { expression, modifiers },
        { evaluateLater, cleanup }
    ) {
        const evaluate = evaluateLater(expression);
        const lockPageScroll = modifiers.includes("noscroll");

        el.style.display = null;
        el.hidden = false;

        function scrollLock(use = true) {
            document.body.style.overflow = use ? "hidden" : "";
        }

        function escapeDialog(event) {
            if (event.key !== "Escape") return;
            evaluate();
            event.preventDefault(); // prevent native escape
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

        el._x_doShow = () => {
            if (el.hasAttribute("open")) return;
            el.showModal();
            el.addEventListener("click", backdropDialog);
            document.addEventListener("keydown", escapeDialog);
            scrollLock(lockPageScroll);
        };

        el._x_doHide = () => {
            if (!el.hasAttribute("open")) return;
            el.close();
            el.removeEventListener("click", backdropDialog);
            document.removeEventListener("keydown", escapeDialog);
            scrollLock(false);
        };

        cleanup(() => {
            el.removeEventListener("click", backdropDialog);
            document.removeEventListener("keydown", escapeDialog);
            scrollLock(false);
        });
    }
}
