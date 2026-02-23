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
load("sidebar", "/components/sidebar.html");

// Load header
fetch("/components/header.html")
  .then(r => r.text())
  .then(html => {
    document.head.insertAdjacentHTML("beforeend", html);
  })
  .catch(console.error);