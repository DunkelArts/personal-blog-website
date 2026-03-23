# This Website

Short writeup about how the website and the infrastructure to host it works.

Full Code is publicly accessible on my [github](https://github.com/DunkelArts/personal-blog-website).

## Dynamic Page loading

Page layout is based on [Holy Grail Layout](https://matthewjamestaylor.com/holy-grail-layout) by Matthew James Taylor. 

![](/assets/images/layout.jpg) 

The content for each section is loaded dynamicly at start to keep a modular structure throughout all sub pages.

```js
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
```

---

## Blog Functionality

Blog Posts can be written in Markdown or HTML and will be parsed at access.

```js
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

  marked.setOptions({
    gfm: true
  });
  
  return marked.parse(md);
}
```

---

## Infrastructure to host it.

All infrastructure needed to host and access the Website is built and maintained by me on my own home server.

The Website runs inside a nginx docker container. Encrypted access is proveded via [reverse proxy](https://nginxproxymanager.com/).

External access is secured by tunnel between pfsense firewall to protect the local network and Cloudflare as a web access firewall and DDOS protection. The Website is only accessible via Cloudflare.

![](/assets/images/website_diagram.jpg)

