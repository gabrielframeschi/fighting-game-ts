export function decreaseHealthBar(player, health) {
    if (health < 0) {
        gsap.to(".".concat(player, "-health"), {
            width: "0%",
        });
        return;
    }
    gsap.to(".".concat(player, "-health"), {
        width: "".concat(health, "%"),
    });
}
