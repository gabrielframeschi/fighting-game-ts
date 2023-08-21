declare var gsap: any;

export function decreaseHealthBar(
  player: "player-1" | "player-2",
  health: number
) {
  if (health < 0) {
    gsap.to(`.${player}-health`, {
      width: "0%",
    });
    return;
  }

  gsap.to(`.${player}-health`, {
    width: `${health}%`,
  });
}
