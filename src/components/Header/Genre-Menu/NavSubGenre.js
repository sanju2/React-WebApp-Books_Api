import React from "react";
import NavGenreBtns from "./NavGenreBtns";

function NavSubGenre(props) {
  function handleGenreClick(e) {
    e.currentTarget.querySelector("h5").style.color = "white";
    e.currentTarget.style.background = "#AAA58E";
    let subGenre = document.querySelector(
      '[data-ref="' + e.target.innerText + '"]'
    );
    subGenre.style.visibility = "visible";
    subGenre.focus();
  }

  function genGenreLst(genreArr) {
    let subGenreArr = genreArr.map(genre => {
      let modifier = "";
      if (genre.title === "Misc." || genre.title === "Children's Books") {
        modifier = " sub-genre--left";
      }
      return (
        <div key={genre.title} className={"genre-menu__sub-genre" + modifier}>
          <button onClick={e => handleGenreClick(e)}>
            <h5>{genre.title}</h5>
          </button>
          <NavGenreBtns
            key={genre.title + " sub-genre-title"}
            onGenreClick={(genre, minDate, maxDate) =>
              props.onGenreClick(genre, minDate, maxDate)
            }
            title={genre.title}
            subGenres={genre.array}
          />
        </div>
      );
    });
    return subGenreArr;
  }

  return <div className="genre-menu">{genGenreLst(props.genreLst)}</div>;
}

export default NavSubGenre;
