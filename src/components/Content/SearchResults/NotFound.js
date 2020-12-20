import React from "react";
import unfound from "../../../Images/404.png";

function NotFound() {
  return (
    <div className="no-results">
      <img src={unfound} alt="book-stack"></img>
      <p>Sorry, We Couldn't Find What You're Looking For....</p>
    </div>
  );
}

export default NotFound;
