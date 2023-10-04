/** Web Worker to track if user is idle
 * Imported to App.vue, timer is tracked in ModalIdle.vue
 */
const TWENTY_FIVE_MINUTES = 1500;
const TWO_MINUTES = 120;

const time = TWO_MINUTES + TWENTY_FIVE_MINUTES;
let countdown = time;
let timer = time;

setInterval(() => {
  timer--;
  if (countdown > 0) {
    countdown--;
  }
  postMessage({ type: 'TICK', timer, countdown });
}, 1000);

self.onmessage = (event) => {
  if (event.data === 'RESET') {
    timer = time;

    if (countdown < 120) {
      countdown = time;
    }
  }

  if (event.data === 'RESET_ALL') {
    countdown = time;
    timer = time;
  }
};
