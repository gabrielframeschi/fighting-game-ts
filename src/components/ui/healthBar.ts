export function decreaseHealthBar(
  player: "player-1" | "player-2",
  health: number
) {
  const healthBar = document.querySelector<HTMLElement>(`.${player}-health`);

  if (!healthBar) return;

  healthBar.style.width = `${health}%`;
}
