document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Fetch news data from both APIs
  Promise.all([fetchNewsDataFromTheNewsAPI(), fetchNewsDataFromCurrentsAPI()])
    .then(([newsData1, newsData2]) => {
      const combinedNewsData = [...newsData1.data, ...newsData2.news];
      displayNews(combinedNewsData);
    })
    .catch(handleError);

  /**
   * Fetches news data from TheNewsAPI
   * @returns {Promise} Promise object represents the news data
   */
  function fetchNewsDataFromTheNewsAPI() {
    const apiKey = "ysagBir0Umv6gPLUNBhWSvWMhnZ5biA1kqXUP1yl";
    const apiUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us`;

    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  }

  /**
   * Fetches news data from Currents API
   * @returns {Promise} Promise object represents the news data
   */
  function fetchNewsDataFromCurrentsAPI() {
    const apiKey = "6GcAKVc8GUol9uH1cx9jUSIvMbyM2XSB91I2_-ldBolRMF7D";
    const apiUrl = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;

    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  }

  /**
   * Displays news data on the webpage
   * @param {Array} articles - The news articles
   */
  function displayNews(articles) {
    articles.forEach((article) => {
      const newsItem = createNewsItem(article);
      newsContainer.appendChild(newsItem);
    });
  }

  /**
   * Creates a news item element
   * @param {Object} article - The news article
   * @returns {HTMLElement} The news item element
   */
  function createNewsItem(article) {
    const newsItem = document.createElement("div");
    newsItem.className = "col-md-4 news-item";

    const card = document.createElement("div");
    card.className = "card";

    if (article.image_url || article.image) {
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = article.image_url || article.image;
      img.alt = article.title;
      card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const newsTitle = document.createElement("h5");
    newsTitle.className = "card-title news-title";
    newsTitle.textContent = article.title;

    const newsDescription = document.createElement("p");
    newsDescription.className = "card-text news-description";
    newsDescription.textContent = article.description;

    const newsLink = document.createElement("a");
    newsLink.className = "btn btn-primary";
    newsLink.href = article.url;
    newsLink.target = "_blank";
    newsLink.textContent = "Read more";

    cardBody.appendChild(newsTitle);
    cardBody.appendChild(newsDescription);
    cardBody.appendChild(newsLink);
    card.appendChild(cardBody);
    newsItem.appendChild(card);

    return newsItem;
  }

  /**
   * Handles errors during the fetch operation
   * @param {Error} error - The error object
   */
  function handleError(error) {
    console.error("Error fetching news:", error);
  }
});
