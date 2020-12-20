import React, { useEffect } from "react";
import StarRating from "react-rating";

function SingleBk(props) {
  useEffect(() => {
    document.getElementById("bk-description").innerHTML = dscrpt;
  });
  function qryAssign(input) {
    if (props.book.querySelector(input) == null) {
      return "No Info Found";
    }
    return props.book.querySelector(input).textContent;
  }

  let ttl = qryAssign("book title");

  let authors = [];
  let author = props.book.querySelector("authors");
  author = author.querySelectorAll("author name");
  author.forEach((name, indx) => {
    let comma = "";
    console.log(author.length, "LENGTH");
    if (indx < author.length - 1) {
      comma = ",";
    }
    authors.push(
      <button onClick={e => props.onAuthClick(e.target.textContent, "author")}>
        {name.textContent + comma}
      </button>
    );
  });
  let dscrpt = qryAssign("book description");
  let pubYr = qryAssign("book original_publication_year");
  let pubMt = qryAssign("book original_publication_month");
  let pubDy = qryAssign("book original_publication_day");
  let pgNum = qryAssign("book num_pages");
  let rating = qryAssign("book average_rating");
  let isbn13 = qryAssign("book isbn13");
  console.log(authors);

  return (
    <div className="sngl-bk-container">
      <div className="sngl-bk-main">
        <div className="sngl-bk-main__cover-title">
          <img src={props.bkCover} alt={ttl} />
          <h3>{ttl}</h3>
          <p>By {authors}</p>
        </div>
        <div className="sngl-bk-main__dscrpt">
          <h5>Description</h5>
          <p id="bk-description"></p>
        </div>
      </div>
      <div className="sngl-bk-sub">
        {rating === 0 ? (
          "No Rating Available"
        ) : (
          <div>
            <StarRating
              className="book-container__ratings"
              initialRating={rating}
              emptySymbol="far fa-star fa-lg"
              fullSymbol="fas fa-star fa-lg"
              fractions={2}
              readonly
            />
            {rating}
          </div>
        )}
        <p>{`Total Pg: ${pgNum}`}</p>
        <p>{`ISBN13: ${isbn13}`}</p>
        <p>{`Published: ${pubMt}/${pubDy}/${pubYr}`}</p>
      </div>
    </div>
  );
}

export default SingleBk;
