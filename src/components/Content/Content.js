import React from "react";
import Home from "./Home/Home";
import GenreBks from "./Genre-View/GenreBks";
import SrchRslt from "./SearchResults/SrchRslt";
import SnglBk from "./Books/Single-View/SingleBk";
import smoothscroll from "smoothscroll-polyfill";
import "./Content.css";

function Content(props) {
  smoothscroll.polyfill();
  window.scrollTo(0, 0);

  let content;

  function handleAuthClick(author, srchTyp) {
    return props.onAuthClick(author, srchTyp);
  }

  if (props.content === "home") {
    content = (
      <Home
        onBkClick={(cover, isbn) => props.onBkClick(cover, isbn)}
        onAuthClick={handleAuthClick}
        onGenreClick={(genreName, minDate, maxDate) =>
          props.onGenreClick(genreName, minDate, maxDate)
        }
        genreLst={props.genres}
      />
    );
  } else if (props.content === "genre") {
    content = (
      <GenreBks
        onBkClick={(cover, isbn) => props.onBkClick(cover, isbn)}
        onAuthClick={handleAuthClick}
        dateMin={props.dateMin}
        dateMax={props.dateMax}
        genre={props.genres}
      />
    );
  } else if (props.content === "search") {
    content = (
      <SrchRslt
        onPgClick={(srchTxt, srchTyp, pg) =>
          props.onPgClick(srchTxt, srchTyp, pg)
        }
        onAuthClick={handleAuthClick}
        pg={props.pg}
        srchTyp={props.srchTyp}
        books={props.books}
      />
    );
  } else {
    content = (
      <div className="book-single-container">
        <h4>{props.books.title}</h4>
        <SnglBk
          type="book"
          onAuthClick={(author, srchTyp) => props.onAuthClick(author, srchTyp)}
          bkCover={props.bkCover}
          book={props.books}
        />
      </div>
    );
  }

  return <div className="content-container">{content}</div>;
}

const MemoContent = React.memo(Content, (prevProps, nextProps) => {
  if (
    prevProps.genres === nextProps.genres &&
    prevProps.books === nextProps.books
  ) {
    return true;
  }
  return false;
});

export default MemoContent;
