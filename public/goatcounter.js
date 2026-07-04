window.goatcounter = Object.assign(window.goatcounter || {}, { no_onload: true });

let pendingPaths = [];

const send = (path) => window.goatcounter.count({ path });

const flush = () => {
  pendingPaths.forEach(send);
  pendingPaths = [];
};

document.addEventListener('astro:page-load', () => {
  const path = location.pathname + location.search;
  if (window.goatcounter.count) {
    send(path);
  } else {
    pendingPaths.push(path);
  }
});

window.addEventListener('load', () => {
  const counterScript = document.querySelector('script[data-goatcounter]');
  if (!counterScript) return;
  if (window.goatcounter.count) {
    flush();
  } else {
    counterScript.addEventListener('load', flush);
  }
});
