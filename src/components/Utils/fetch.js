import API_CALLS from "./APICalls";

const { NYT_API_KEY } = API_CALLS["NYT"];
const { GR_KEY } = API_CALLS["GR"];
const CORS = "https://cors-anywhere.herokuapp.com/";

export function goHome() {
  return this.fetchJSON(
    `${CORS}https://api.nytimes.com/svc/books/v3/lists/overview.json?current/&api-key=${NYT_API_KEY}`
  )
    .then(data => this.setStateDataJSON(data, "genres", "lists"))
    .catch(error => this.setState({ error }));
}

export function getGenres() {
  return this.fetchJSON(
    `${CORS}https://api.nytimes.com/svc/books/v3/lists/names.json?&api-key=${NYT_API_KEY}`
  )
    .then(data => this.setStateDataJSON(data, "navGenres"))
    .catch(error => this.setState({ error }));
}

export function genreView(genreTxt) {
  return this.fetchJSON(
    `${CORS}https://api.nytimes.com/svc/books/v3/lists/${genreTxt}.json?api-key=${NYT_API_KEY}`
  )
    .then(data => this.setStateDataJSON(data, "genres"))
    .catch(error => this.setState({ error }));
}

export function bookDetailView(isbn) {
  this.fetchXML(
    `${CORS}https://www.goodreads.com/book/isbn/${isbn}?key=${GR_KEY}`
  )
    .then(data => getBookId(data))
    .then(id =>
      this.fetchXML(
        `${CORS}https://www.goodreads.com/book/show/${id}?key=${GR_KEY}`
      )
    )
    .then(data => this.setStateDataXML(data, "books"))
    .catch(error => this.setState({ error }));
}

export function getBookId(data) {
  return data.querySelector("book id").textContent;
}

export function searchTitle(searchTxt, pg = 1) {
  return this.fetchXML(
    `${CORS}https://www.goodreads.com/search/index.xml?key=${GR_KEY}&search[field]=title&q=${searchTxt}&page=${pg}`
  )
    .then(data => this.setStateDataXML(data, "books"))
    .catch(error => this.setState({ error }));
}

export function searchAuthor(searchTxt) {
  return this.fetchXML(
    `${CORS}https://www.goodreads.com/api/author_url/${searchTxt}?key=${GR_KEY}`
  )
    .then(data => getAuthorId(data))
    .then(id =>
      this.fetchXML(
        `${CORS}https://www.goodreads.com/author/show/${id}?format=xml&key=${GR_KEY}`
      )
    )
    .then(data => this.setStateDataXML(data, "books"))
    .catch(error => this.setState({ error }));
}

export function getAuthorId(data) {
  return data.querySelector("author").getAttribute("id");
}

export function setDateHome(date) {
  return this.fetchJSON(
    `${CORS}https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=${NYT_API_KEY}`
  )
    .then(data => this.setStateDataJSON(data, "genres", "lists"))
    .catch(error => this.setState({ error }));
}

export function setDateGenre(date, genreTxt) {
  return this.fetchJSON(
    `https://api.nytimes.com/svc/books/v3/lists/${date}/${genreTxt}.json?api-key=${NYT_API_KEY}`
  )
    .then(data => this.setStateDataJSON(data, "genres"))
    .catch(error => this.setState({ error }));
}

export function fetchJSON(input) {
  this.isLoadingToggle(true);
  return fetch(input).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong...");
    }
  });
}

export function fetchXML(input) {
  this.isLoadingToggle(true);
  return fetch(input)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Bad Response");
      }
    })
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"));
}

export function setStateDataJSON(data, state, property, results = "results") {
  let stateObj = {};
  if (state === undefined) {
    return data;
  } else {
    stateObj[state] =
      property != null
        ? data[results][property]
        : (stateObj[state] = data[results]);
    this.setState(stateObj);
  }
  this.isLoadingToggle(false);
}

export function setStateDataXML(data, state) {
  let stateObj = {};
  if (state === undefined) {
    return data;
  } else {
    stateObj[state] = data;
    this.setState(stateObj);
  }
  this.isLoadingToggle(false);
}

export function isLoadingToggle(bool) {
  return this.setState({ isLoading: bool });
}
