import React from "react";
import SrchHdr from "./SrchHdr";
import SrchBk from "../Books/Search-Veiw/SrchBk";
import SrchBtns from "./SrchBtns";
import NotFound from "./NotFound";
import "./Search.css";

function SrchRslt(props) {
  if (props.books.querySelector("author name") == null) {
    return <NotFound />;
  }

  function qryAssign(input) {
    if (props.books.querySelector(input) == null) {
      return "No Info Found";
    }
    return props.books.querySelector(input).textContent;
  }

  let bkDataArr = [];
  let authorInfo, authorHome, authorLnk, authorImg, indxStrt, pgTotal, bksPrPg;
  let author = qryAssign("author name");

  if (props.srchTyp === "title") {
    indxStrt = qryAssign("results-start");
    indxStrt = parseInt(indxStrt);
    pgTotal = qryAssign("search total-results");
    bksPrPg = 20;
    props.books
      .querySelectorAll("search results work")
      .forEach(book => bkDataArr.push(book));
  }

  if (props.srchTyp === "author") {
    authorImg = qryAssign("author image_url");
    authorLnk = qryAssign("author link");
    authorInfo = qryAssign("author about");
    authorHome = qryAssign("author hometown");
    props.books
      .querySelectorAll("author books book")
      .forEach(book => bkDataArr.push(book));
  }

  pgTotal = Math.ceil(pgTotal / bksPrPg);

  let bookCode = bkDataArr.map((book, indx) => {
    return (
      <SrchBk
        key={author + indx}
        onAuthClick={(author, srchTyp) => props.onAuthClick(author, srchTyp)}
        srchTyp={props.srchTyp}
        author={author}
        indx={indxStrt + indx}
        book={book}
      />
    );
  });
  return (
    <div className="srch-container">
      {props.srchTyp === "author" ? (
        <SrchHdr
          author={author}
          authorDscrpt={authorInfo}
          homeTown={authorHome}
          authLnk={authorLnk}
          authImg={authorImg}
        />
      ) : (
        <h2>TITLE SEARCH RESULTS</h2>
      )}
      <div className="srch-bk-list">{bookCode}</div>
      {props.srchTyp === "author" ? null : (
        <SrchBtns
          onPgClick={(srchTxt, srchTyp, pg) =>
            props.onPgClick(srchTxt, srchTyp, pg)
          }
          srchTyp={props.srchTyp}
          pg={props.pg}
          pgTotal={pgTotal}
        />
      )}
    </div>
  );
}

export default SrchRslt;
