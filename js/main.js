fetch('songs.json')
  .then(res => res.json())
  .then(data => {
    const fuse = new Fuse(data, {
      keys: ['title', 'lyrics', 'translation', 'background', 'tags'],
      threshold: 0.3
    });

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
      const results = fuse.search(searchInput.value);
      displayResults(results.map(r => r.item));
    });

    displayResults(data);
  });

function displayResults(songs) {
  const container = document.getElementById('results');
  container.innerHTML = '';
  songs.forEach(song => {
    const div = document.createElement('div');
    div.innerHTML = `<a href="song.html?title=${encodeURIComponent(song.title)}">${song.title}</a>`;
    container.appendChild(div);
  });
}
