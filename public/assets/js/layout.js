function load(id, url) {
  const el = document.getElementById(id);
  if (!el) return;

  fetch(url)
    .then(r => r.text())
    .then(html => {
      el.innerHTML = html;
    })
    .catch(console.error);
}

// Load Components
load("header", "/components/header.html");
load("right-sidebar", "/components/right-sidebar.html");
load("left-sidebar", "/components/left-sidebar.html");
load("main-content", "/pages/startpage.html");
load("footer", "/components/footer.html");

// Load header
fetch("/components/html-header.html")
  .then(r => r.text())
  .then(html => {
    document.head.insertAdjacentHTML("beforeend", html);
  })
  .catch(console.error);

// Embed Me Button
function copyEmbed() {
  const title = document.getElementById("embedTitle");
  const embedCode = document.getElementById("embedCode").value;

  navigator.clipboard.writeText(embedCode).then(() => {
    const original = title.textContent;
    title.textContent = "Copied!";

    setTimeout(() => {
      title.textContent = original;
    }, 1200);
  });
}
