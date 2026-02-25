function loadPosts(containerId, folder) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(`${folder}/manifest.json`)
    .then(r => r.json())
    .then(files => {
      files.forEach(file => {
        fetch(`${folder}/${file}`)
          .then(r => r.text())
          .then(md => {
            const post = document.createElement("div");

            const slug = file.replace(".md", "");

            post.className = "post-item post-item-preview";
            post.id = slug;
            post.dataset.slug = slug;
            post.innerHTML = marked.parse(md);

            post.addEventListener("click", () => {
              showSinglePost(slug);
            });

            container.appendChild(post);
          });
      });

      // open post from URL hash on load
      openFromHash();
    });
}

function showSinglePost(slug) {
  document.querySelectorAll(".post-item").forEach(post => {
    if (post.dataset.slug === slug) {
      post.classList.remove("post-item-preview");
      post.style.display = "block";
      post.style.cursor = "default";
      post.scrollIntoView({ behavior: "smooth" });
    } else {
      post.style.display = "none";
    }
  });

  history.pushState(null, "", `#${slug}`);
}

function showAllPosts() {
  document.querySelectorAll(".post-item").forEach(post => {
    post.style.display = "block";
    post.classList.add("post-item-preview");
    post.style.cursor = "pointer";
  });

  history.pushState(null, "", location.pathname);
}

function openFromHash() {
  const slug = location.hash.replace("#", "");
  if (!slug) return;

  const post = document.getElementById(slug);
  if (post) showSinglePost(slug);
}

// handle browser back/forward
window.addEventListener("popstate", openFromHash);


// init
loadPosts("posts", "/blog/posts");