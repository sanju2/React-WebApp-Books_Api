import React from "react";
import Book from "../Books/Book";

function GenreBks(props) {
  document
    .querySelectorAll("genre-menu__btns")
    .forEach(item => (item.style.visibility = "hidden"));
  let dateMin = dateFormat(props.dateMin);
  let dateMax = dateFormat(props.dateMax);
  let monthly;
  let bookArr = props.genre.books.map((book, indx) => {
    return (
      <Book
        key={book.title + "-" + indx}
        onBkClick={(cover, isbn) => props.onBkClick(cover, isbn)}
        onAuthClick={(author, srchTyp) => props.onAuthClick(author, srchTyp)}
        type="genre"
        book={book}
      />
    );
  });

  function dateFormat(date) {
    if (date >= new Date() - 7) {
      return "Current";
    }
    let dateStr = date.toISOString().substr(0, 10);
    dateStr = dateStr.split("-");
    dateStr.push(dateStr.shift());
    dateStr = dateStr.join("/");
    return dateStr;
  }

  if (
    props.genre.display_name.includes("Audio") ||
    props.genre.display_name === "Business" ||
    props.genre.display_name === "Science" ||
    props.genre.display_name === "Sports and Fitness"
  ) {
    monthly = "(List is updated monthly)";
  }

  return (
    <div className="genre-container">
      <div className="genre-container__title-block">
        <h3>{props.genre.display_name}</h3>
        <p>
          Active from: {dateMin} to {dateMax}
        </p>
        <p>{monthly}</p>
      </div>
      <div className="booklist-container">{bookArr}</div>
    </div>
  );
}

export default GenreBks;
