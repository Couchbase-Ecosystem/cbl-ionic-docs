// Scarf pixel – SPA-aware tracking for the Docusaurus documentation site.
// This client module fires on the initial page load and on every subsequent
// in-app navigation so that each page view is recorded, even in a SPA where
// the full page is never reloaded.

const PIXEL_ID = '5ff443aa-dd19-43ab-9c9e-ad26252d0fb0';

let lastHref = null;

function sendScarfPing() {
  const currentHref = window.location.href;
  if (currentHref === lastHref) return; // dedup: skip if same page
  lastHref = currentHref;

  const img = new Image();
  img.referrerPolicy = 'no-referrer-when-downgrade';
  img.src = `https://static.scarf.sh/a.png?x-pxid=${PIXEL_ID}`;
}

// Docusaurus client-module lifecycle hook – called after every route update
// (initial load + every SPA navigation).
export function onRouteDidUpdate() {
  sendScarfPing();
}
