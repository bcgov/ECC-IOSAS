/** Web Worker to track if user is idle
 * Imported to App.vue, timer is tracked in ModalIdle.vue
 */
const TWENTY_FIVE_MINUTES = 1500;
const TWO_MINUTES = 120;

let countdown = TWO_MINUTES + TWENTY_FIVE_MINUTES;
let timer = TWENTY_FIVE_MINUTES + TWO_MINUTES;

setInterval(() => {
  timer--;
  countdown--;
  postMessage({ type: 'TICK', timer, countdown });
}, 1000);

self.onmessage = (event) => {
  if (event.data === 'RESET') {
    timer = TWENTY_FIVE_MINUTES;
  }

  if (event.data === 'RESET_ALL') {
    countdown = TWO_MINUTES + TWENTY_FIVE_MINUTES;
    timer = TWO_MINUTES + TWENTY_FIVE_MINUTES;
  }
};
