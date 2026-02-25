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
load("right-sidebar", "/components/sidebar.html");
load("footer", "/components/footer.html");

// Load header
fetch("/components/header.html")
  .then(r => r.text())
  .then(html => {
    document.head.insertAdjacentHTML("beforeend", html);
  })
  .catch(console.error);

// Embed Me Button
const title = document.getElementById("embedTitle");

title.addEventListener("click", () => {
  navigator.clipboard.writeText(
    document.getElementById("embedCode").value
  ).then(() => {
    const original = title.textContent;
    title.textContent = "Copied!";
    setTimeout(() => title.textContent = original, 1200);
  });
});