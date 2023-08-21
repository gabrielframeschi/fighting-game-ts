export function decreaseHealthBar(player, health) {
    var healthBar = document.querySelector(".".concat(player, "-health"));
    if (!healthBar)
        return;
    if (health < 0) {
        healthBar.style.width = "0%";
        return;
    }
    healthBar.style.width = "".concat(health, "%");
}
