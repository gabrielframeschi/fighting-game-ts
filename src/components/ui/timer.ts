export let timer = 11;
export let timerId: number;
export function decreaseTimer() {
  if (timer <= 0) return;

  timerId = setTimeout(decreaseTimer, 1000);

  timer--;

  const timerElement = document.querySelector<HTMLElement>(".timer");
  if (timerElement) timerElement.innerHTML = timer.toString();
}
