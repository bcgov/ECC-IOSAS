const TWENTY_FIVE_MINUTES = 1500;

let timer = TWENTY_FIVE_MINUTES;

const resetTimer = () => (timer = TWENTY_FIVE_MINUTES);

setInterval(() => {
  timer--;
  postMessage({ type: 'TICK', timer });
}, 1000);

self.onmessage = (event) => {
  if (event.data === 'RESET') {
    resetTimer();
  }
};
