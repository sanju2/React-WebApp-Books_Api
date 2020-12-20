import React from "react";
import MinGenre from "./MinGenre";

function Home(props) {
  if (props.genreLst.length > 0) {
    var mainGenres = props.genreLst.slice(0, 5);
    var minGenreLst = [];
    function genMinGenre(genreLst) {
      for (let i = 0; i < 5; i++) {
        minGenreLst.push(
          <MinGenre
            key={genreLst[i].display_name}
            onBkClick={(cover, isbn) => props.onBkClick(cover, isbn)}
            onAuthClick={(author, srchTyp) =>
              props.onAuthClick(author, srchTyp)
            }
            books={genreLst[i].books}
            genre={genreLst[i]}
            onGenreClick={(genreName, minDate, maxDate) =>
              props.onGenreClick(genreName, minDate, maxDate)
            }
          />
        );
      }
    }
    genMinGenre(mainGenres);
  }
  return <div>{minGenreLst}</div>;
}

export default Home;
