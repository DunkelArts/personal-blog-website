function loadEntries(containerId, folder) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(`${folder}/manifest.json`)
    .then(res => res.json())
    .then(entries => {
      entries.forEach(entry => {
        const clickable_element = document.createElement("div")
        clickable_element.className = "label-button entry-button";
        clickable_element.setAttribute("onclick", `displayEntry(this,"${folder}/${entry.filename}")`)

        const title = document.createElement("div")
        title.textContent = entry.title;
        title.className = "entry-title"

        const date = document.createElement("div")
        date.textContent = entry.date;
        date.className = "entry-date"

        clickable_element.append(title, date);
        
        const entries_div = document.getElementById("entries")
        entries_div.appendChild(clickable_element)
    });
    // display the first Post
    displayEntry(null, `${folder}/${entries[0].filename}`)
  }) 
}

function displayEntry(el, filename) {
  // display Post
  const container = document.getElementById("post")

  fetch(filename)
  .then(res => res.text())
  .then(md => {
    container.innerHTML = marked.parse(md);
    post.className = "post-item";
  })
  .catch(console.error);

  if (!el) return;

  // remove active from all buttons
  document.querySelectorAll(".entry-button").forEach(btn =>
    btn.classList.remove("active")
  );

  // activate clicked button
  el.classList.add("active");
}

loadEntries("entries", "/posts");