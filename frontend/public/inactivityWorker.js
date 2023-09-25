/** Web Worker to track if user is idle
 * Imported to App.vue, timer is tracked in ModalIdle.vue
 */
const TWENTY_FIVE_MINUTES = 50; //1500
const TWO_MINUTES = 120;

let timer = TWENTY_FIVE_MINUTES;
let countdown = TWO_MINUTES;

const resetTimer = () => (timer = TWENTY_FIVE_MINUTES);
const resetCountdown = () => (countdown = TWO_MINUTES);

setInterval(() => {
  timer--;
  // if (timer <= 0) {
  //   countdown--;
  // }
  postMessage({ type: 'TICK', timer });
}, 1000);

self.onmessage = (event) => {
  if (event.data === 'RESET') {
    resetTimer();
  }
};

self.onmessage = (event) => {
  if (event.data === 'RESET_COUNTDOWN') {
    resetCountdown();
  }
};
