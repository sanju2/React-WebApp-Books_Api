import React, { useState } from "react";
import smoothscroll from "smoothscroll-polyfill";

function SrchBtns(props) {
  const [currPg, setPg] = useState(1);
  smoothscroll.polyfill();
  let placeholders = document.getElementsByClassName("srch-book-placeholder");
  let books = document.getElementsByClassName("book-hide");
  let pgArr = [];

  if (currPg !== parseInt(props.pg)) {
    setPg(parseInt(props.pg));
  }

  function handlePgBtnClick(pg) {
    for (let i = 0; i < placeholders.length; i++) {
      placeholders[i].style.display = "block";
      books[i].style.display = "none";
    }
    window.scrollTo(0, 0);
    let srchTxt = document.getElementsByClassName("search__input")[0].value;
    return props.onPgClick(srchTxt, props.srchTyp, pg);
  }

  function genPgBtns(pgTotal) {
    let end = currPg + 4;
    let i = currPg - 4;
    if (i <= 0) {
      i = 1;
      end = 9;
    }
    if (pgTotal < 10) {
      end = pgTotal;
    }
    if (end > pgTotal) {
      end = pgTotal;
      i = pgTotal - 8;
    }
    for (i; i <= end; i++) {
      pgArr.push(
        <button
          key={i}
          className={i === currPg ? "current-pg" : null}
          onClick={e => handlePgBtnClick(e.target.innerText)}
        >
          {i}
        </button>
      );
    }
  }

  genPgBtns(props.pgTotal);

  return (
    <div className="srch-pagination">
      {currPg > 4 ? (
        <button onClick={() => handlePgBtnClick(1)}>{"<"}</button>
      ) : null}
      {pgArr}
      {currPg + 4 < props.pgTotal ? (
        <button onClick={() => handlePgBtnClick(props.pgTotal)}>{">"}</button>
      ) : null}
    </div>
  );
}

export default SrchBtns;
