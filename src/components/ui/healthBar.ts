export function decreaseHealthBar(
  player: "player-1" | "player-2",
  health: number
) {
  const healthBar = document.querySelector<HTMLElement>(`.${player}-health`);

  if (!healthBar) return;

  if (health < 0) {
    healthBar.style.width = "0%";
    return;
  }

  healthBar.style.width = `${health}%`;
}
