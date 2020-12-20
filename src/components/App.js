import React, { Component } from "react";
import Nav from "./Header/Nav";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import {
  goHome,
  getGenres,
  genreView,
  bookDetailView,
  searchTitle,
  searchAuthor,
  setDateHome,
  setDateGenre,
  fetchXML,
  fetchJSON,
  setStateDataXML,
  setStateDataJSON,
  isLoadingToggle
} from "./Utils/fetch";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.goHome = goHome.bind(this);
    this.getGenres = getGenres.bind(this);
    this.bookDetailView = bookDetailView.bind(this);
    this.genreView = genreView.bind(this);
    this.searchTitle = searchTitle.bind(this);
    this.searchAuthor = searchAuthor.bind(this);
    this.setDateHome = setDateHome.bind(this);
    this.setDateGenre = setDateGenre.bind(this);
    this.fetchXML = fetchXML.bind(this);
    this.fetchJSON = fetchJSON.bind(this);
    this.isLoadingToggle = isLoadingToggle.bind(this);
    this.setStateDataXML = setStateDataXML.bind(this);
    this.setStateDataJSON = setStateDataJSON.bind(this);
    this.state = {
      date: new Date(),
      dateMin: new Date("2008-06-08"),
      dateMax: new Date(),
      navGenres: [],
      books: [],
      bkCover: "",
      genres: [],
      content: "home",
      pg: 1,
      searchTxt: "",
      searchTyp: "",
      genreTxt: "",
      isLoading: false,
      error: null
    };
  }
  componentDidMount() {
    this.setState({ content: "home" });
    Promise.all([this.getGenres(), this.goHome()]);
  }

  goHomeNow = () => {
    this.setState({
      content: "home",
      searchTxt: "",
      searchTyp: "Title",
      date: new Date(),
      dateMin: new Date("2008-06-08"),
      dateMax: new Date()
    });
    this.goHome();
  };

  handleSelectUpdate = srchTyp => {
    this.setState({ searchTyp: srchTyp });
  };

  handleSearch = (searchTxt, searchTyp, pg = 1) => {
    searchTxt = searchTxt.replace(/,/g, "");
    this.setState({
      searchTxt: searchTxt,
      content: "search",
      searchTyp: searchTyp,
      pg: pg
    });
    searchTxt = searchTxt.replace(/\s/g, "+").toLowerCase();
    searchTxt = searchTxt.replace(/'/g, "%27s");
    if (searchTyp === "title") {
      this.searchTitle(searchTxt, pg);
    } else {
      this.searchAuthor(searchTxt);
    }
  };

  handleSearchTxtUpdate = text => {
    this.setState({ searchTxt: text });
  };

  handleDateUpdate = date => {
    if (this.state.content === "home") {
      this.setState({ searchTxt: "", date: new Date(date) });
      this.setDateHome(date);
    } else {
      this.setState({
        genreTxt: this.state.genreTxt,
        searchTxt: "",
        date: new Date(date)
      });
      this.setDateGenre(date, this.state.genreTxt);
    }
  };

  handleGenreUpdate = (genreTxt, dateMin, dateMax) => {
    this.setState({
      genreTxt: genreTxt,
      content: "genre",
      searchTxt: "",
      dateMin: new Date(dateMin),
      dateMax: new Date(dateMax),
      date: new Date(dateMax)
    });
    this.genreView(genreTxt);
  };

  handleBkClick = (cover, isbn) => {
    this.setState({ content: "book", bkCover: cover });
    this.bookDetailView(isbn);
  };

  render() {
    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }
    return (
      <div className="App">
        <Nav
          onHomeClick={this.goHomeNow}
          onSelectUpdate={this.handleSelectUpdate}
          onSearchUpdate={text => {
            this.setState({ searchTxt: text });
          }}
          onSearchSubmit={this.handleSearch}
          onGenreClick={this.handleGenreUpdate}
          onDateChange={this.handleDateUpdate}
          content={this.state.content}
          searchTyp={this.state.searchTyp}
          searchTxt={this.state.searchTxt}
          genreTxt={this.state.genreTxt}
          navGenres={this.state.navGenres}
          date={this.state.date}
          dateMin={this.state.dateMin}
          dateMax={this.state.dateMax}
        />
        <Content
          onBkClick={this.handleBkClick}
          onAuthClick={this.handleSearch}
          onGenreClick={this.handleGenreUpdate}
          onPgClick={this.handleSearch}
          content={this.state.content}
          srchTyp={this.state.searchTyp}
          pg={this.state.pg}
          books={this.state.books}
          bkCover={this.state.bkCover}
          isLoading={this.state.isLoading}
          dateMin={this.state.dateMin}
          dateMax={this.state.dateMax}
          genres={this.state.genres}
        />
        <Footer />
      </div>
    );
  }
}
