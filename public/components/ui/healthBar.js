export function decreaseHealthBar(player, health) {
    var healthBar = document.querySelector(".".concat(player, "-health"));
    if (!healthBar)
        return;
    healthBar.style.width = "".concat(health, "%");
}
