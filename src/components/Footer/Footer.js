import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-container__left">
        <h5>About The App</h5>
        <p className="footer-container__description">
          I created this app to help find more books to read and expand my
          horizons. It gives a complete history of the NYT Best Sellers list and
          shows ratings and search results from Good Reads so you find out more
          about the books you’re interested in.
        </p>
        <h5>Resources</h5>
        <a
          href="https://www.nytimes.com/books/best-sellers/"
          rel="noopener noreferrer"
          target="blank"
        >
          https://www.nytimes.com/books/best-sellers/
        </a>
        <a
          href="https://www.goodreads.com"
          rel="noopener noreferrer"
          target="blank"
        >
          https://www.goodreads.com
        </a>
      </div>
      <div className="footer-container__right">
        <h4>Best Seller Books</h4>
        <p>(202) 555-0114</p>
        <p>Pacific Place, 600 Pine St Suite 107,</p>
        <p>Seattle, WA 98101</p>
        <p className="copyright">&copy; 2019 Best Selling Books, Seattle, WA</p>
      </div>
    </div>
  );
}

export default Footer;
