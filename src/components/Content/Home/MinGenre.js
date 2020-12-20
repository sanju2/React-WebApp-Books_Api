import React from "react";
import Book from "../Books/Book";

function MinGenre(props) {
  function handleGenreClick() {
    let genre = document.querySelector(
      "button[data-name=" + props.genre.list_name_encoded + "]"
    );
    let genreName = genre.dataset.name;
    let minDate = genre.dataset.minDate;
    let maxDate = genre.dataset.maxDate;
    return props.onGenreClick(genreName, minDate, maxDate);
  }

  let bookArr = props.books.map(book => {
    return (
      <Book
        key={props.genre.display_name + "-" + book.title}
        onBkClick={(cover, isbn) => props.onBkClick(cover, isbn)}
        onAuthClick={(author, srchTyp) => props.onAuthClick(author, srchTyp)}
        type="overview"
        book={book}
      />
    );
  });

  return (
    <div className="overview-genre">
      <button className="overview-genre__title" onClick={handleGenreClick}>
        {props.genre.display_name}
      </button>
      <div className="overview-books">{bookArr}</div>
    </div>
  );
}

export default MinGenre;
