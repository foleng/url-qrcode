(async () => {
  const src = chrome.extension.getURL('/assets/popup.83b5bdf0.js');
  await import(src);
  })();