export function updateMatchResultLabel(text) {
    var label = document.querySelector(".match-result-label");
    if (!label)
        return;
    label.innerHTML = text;
    label.style.display = "flex";
}
