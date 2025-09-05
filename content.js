console.log("[YT Summariser] content script loaded on", location.href);

(function () {
  // only act on actual video pages
  const isWatchPage = () => /youtube\.com\/watch/.test(location.href);

  function injectBox() {
    // avoid duplicates
    if (document.getElementById("yt-ai-summary-box")) {
      console.log("[YT Summariser] box already present, skipping");
      return;
    }

    const box = document.createElement("div");
    box.id = "yt-ai-summary-box";
    box.textContent = "YouTube AI summariser (change later)";
    Object.assign(box.style, {
      position: "fixed",
      top: "80px",
      right: "16px",
      zIndex: 2147483647, // very high
      width: "280px",
      padding: "12px",
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",        // <- fixed spelling
      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    });

    document.body.appendChild(box);
    console.log("[YT Summariser] box injected");
  }

  // initial inject
  if (isWatchPage()) injectBox();

  // YT is a single-page app; watch for URL/content changes
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    const urlNow = location.href;
    if (urlNow !== lastUrl) {
      lastUrl = urlNow;
      console.log("[YT Summariser] URL changed →", urlNow);
      if (isWatchPage()) injectBox();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
