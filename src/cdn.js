import dialog from "./dialog.js";

document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(dialog);
});
