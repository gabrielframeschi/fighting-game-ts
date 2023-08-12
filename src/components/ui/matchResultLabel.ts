export function updateMatchResultLabel(text: string) {
  const label = document.querySelector<HTMLElement>(".match-result-label");
  if (!label) return;

  label.innerHTML = text;
  label.style.display = "flex";
}
