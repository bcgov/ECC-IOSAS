/** Web Worker to track if user is idle
 * Imported to App.vue, timer is tracked in ModalIdle.vue
 */
const TWENTY_FIVE_MINUTES = 1500;

let timer = TWENTY_FIVE_MINUTES;

setInterval(() => {
  timer--;
  postMessage({ type: 'TICK', timer });
}, 1000);

self.onmessage = (event) => {
  if (event.data === 'RESET') {
    timer = TWENTY_FIVE_MINUTES;
  }
};
