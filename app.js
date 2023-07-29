const newsTitleEl = document.getElementById('newsTitle');
const newsDescEl = document.getElementById('newsDesc');
const newsAuthorEl = document.getElementById('newsAuthor');
const searchBtnEl = document.getElementById('searchBtn');
const topicEl = document.getElementById('topic');
const containerEl = document.querySelector('.container');

function clearNews() {
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
}

searchBtnEl.addEventListener('click', (event) => {
  clearNews();

  const value = topicEl.value;
  const apiKey = 'My API Key';
  const apiUrl = `https://newsapi.org/v2/top-headlines?q=${value}&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Data not found');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data.articles.length === 0) {
        alert('No data available for this topic');
      } else {
        for (let i = 0; i < data.articles.length; i++) {
          let myData = data.articles[i];

          let box = document.createElement('div');
          box.className = 'box';

          let img = document.createElement('img');
          img.setAttribute('src', myData.urlToImage);
          img.setAttribute(
            'alt', 
            "Missing image, but don\'t worry - the content is still great"
          );
          img.setAttribute('width', '300');
          img.setAttribute('height', '150');
          img.style.borderRadius = '20px';

          let title = document.createElement('h2');
          title.id = 'newsTitle';
          title.style.fontFamily = 'Montserrat';

          let desc = document.createElement('h4');
          desc.id = 'newsDesc';
          desc.style.fontFamily = 'Open Sans';

          let author = document.createElement('h5');
          author.id = 'newsAuthor';
          author.style.fontFamily = 'Open Sans';
          author.style.fontWeight = '400';

          let hr = document.createElement('hr');

          let viewMoreBtn = document.createElement('button');
          viewMoreBtn.id = 'viewMoreBtn';
          viewMoreBtn.textContent = 'Read More';
          viewMoreBtn.addEventListener('click', (event) => {
            window.open(myData.url);
          });

          containerEl.append(box);
          box.append(img, title, hr, desc, author, viewMoreBtn);

          title.textContent = myData.title;
          desc.textContent = myData.description;
          author.textContent = '-' + myData.author;

          if (desc.textContent == '') {
            desc.textContent =
              "We\'re sorry, but the content you requested could not be loaded at this time.";
          }
        }
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Data not found');
    });
});
