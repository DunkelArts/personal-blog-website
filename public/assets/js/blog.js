function loadBlogEntries(id, folder) {
    const el = document.getElementById(id);
    if (!el) return;

    // load Page
    fetch(`${folder}/posts.html`)
    .then(r => r.text())
    .then(html => {
        el.innerHTML = html;

        // load Posts
        const posts = el.querySelector("#posts");

        fetch(`${folder}/manifest.json`)
        .then(res => res.json())
        .then(entries => {
            entries.forEach(entry => {
                const summary = document.createElement("summary");
                summary.textContent = `${entry.title} - ${entry.date}`;

                const content = document.createElement("div");
                content.className = "post-content";
                content.textContent = "Loading...";

                loadMarkdown(`${folder}/${entry.filename}`)
                .then(html => {
                    content.innerHTML = html;

                    content.querySelectorAll("pre code").forEach(block => {
                        hljs.highlightElement(block);
                    });
                });

                const details = document.createElement("details");
                details.className = "post-item"
                details.appendChild(summary);
                details.appendChild(content);

                posts.appendChild(details);
            });
        });

    })
    .catch(console.error);
}

async function loadMarkdown(url) {
  const res = await fetch(url);
  const md = await res.text();
  return marked.parse(md);
}