import React from "react";
import noCover from "../../../Images/Book-Placeholder.png";

function BookMainInfo(props) {
  if (props.author) {
    let authorTxt = props.author.split(/,|\sand\s|\swith\s/);
    var authorArr = authorTxt.map((author, indx) => {
      if (indx < authorTxt.length - 1) {
        return (
          <span key={author}>
            <button
              className="author-btn"
              onClick={() => props.onAuthClick(author, "author")}
            >
              {author},
            </button>
          </span>
        );
      } else {
        return (
          <button
            key={author}
            className="author-btn"
            onClick={() => props.onAuthClick(author, "author")}
          >
            {author}
          </button>
        );
      }
    });
  }
  let bookCover = props.bkImg !== null ? props.bkImg : noCover;

  let descriptionBlk = (
    <div className="book-container__description">
      <h4>Description</h4>
      <p>{props.dscrpt ? props.dscrpt : "No Description Available..."}</p>
    </div>
  );
  function handleBkClick() {
    return props.onBkClick(bookCover);
  }
  return (
    <div className="book-container__gen-info" data-ref={props.type}>
      <div className="book-container__rank">
        <strong>#{props.rank}</strong>
      </div>
      <div className="book-container__cover" data-ref={props.type}>
        <img onClick={handleBkClick} src={bookCover} alt={props.title} />
        {props.type === "genre" ? descriptionBlk : <></>}
      </div>
      <div className="book-container__title-author">
        <button className="book-title" onClick={handleBkClick}>
          {props.title}
        </button>
        <div className="book-container__author-info">
          <p>by</p>
          <div className="book-container__author-btns" data-ref={props.type}>
            {authorArr}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMainInfo;
