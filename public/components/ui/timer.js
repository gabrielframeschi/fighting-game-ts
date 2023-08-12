export var timer = 61;
export var timerId;
export function decreaseTimer() {
    if (timer <= 0)
        return;
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    var timerElement = document.querySelector(".timer");
    if (timerElement)
        timerElement.innerHTML = timer.toString();
}
