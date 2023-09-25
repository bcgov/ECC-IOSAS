/** Web Worker to track if user is idle
 * Imported to ModalIdle.vue and used to countdown to logout if user is idle
 */
const TWO_MINUTES = 120;

let countdown = TWO_MINUTES;

setInterval(() => {
  countdown--;
  postMessage({ type: 'TICK', countdown });
}, 1000);

self.onmessage = (event) => {
  if (event.data === 'RESET') {
    countdown = TWO_MINUTES;
  }
};
