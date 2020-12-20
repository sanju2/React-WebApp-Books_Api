import React from "react";

function Search(props) {
  function handleSelectUpdate(e) {
    return props.onSelectUpdate(e.target.value);
  }

  function handleSearchText(e) {
    return props.onSearchUpdate(e.target.value);
  }

  function handleEnter(e) {
    if (e.keyCode === 13) {
      e.target.blur();
      return handleSearchSubmit(e.target.value);
    }
    return;
  }

  function handleSearchSubmit() {
    let searchTyp = document.getElementsByClassName("search__type")[0].value;
    return props.onSearchSubmit(props.searchTxt, searchTyp);
  }

  return (
    <div className="search">
      <input
        className="search search__input"
        type="text"
        placeholder="Search..."
        onChange={handleSearchText}
        onKeyDown={handleEnter}
        value={props.searchTxt}
      />
      <select
        className="search search__type"
        value={props.searchTyp}
        onChange={handleSelectUpdate}
        name="search-options"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <button className="search search__btn" onClick={handleSearchSubmit}>
        Search
      </button>
    </div>
  );
}

const MemoSearch = React.memo(Search, (prevProps, nextProps) => {
  if (prevProps === nextProps) {
    return true;
  }
  return false;
});

export default MemoSearch;
