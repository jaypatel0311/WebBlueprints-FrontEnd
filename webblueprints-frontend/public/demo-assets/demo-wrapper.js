// public/demo-assets/demo-wrapper.js
(function () {
  // Add watermark
  const watermark = document.createElement("div");
  watermark.className = "demo-watermark";
  watermark.textContent = "DEMO";
  document.body.appendChild(watermark);

  // Handle messaging with parent
  window.addEventListener("message", function (event) {
    if (event.data.type === "DEMO_COMMAND") {
      console.log("Demo command received:", event.data);
    }
  });

  // Disable form submissions in demo mode
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submissions are disabled in demo mode");
  });

  // Signal ready to parent
  if (window.parent !== window) {
    window.parent.postMessage({ type: "DEMO_READY" }, "*");
  }
})();
