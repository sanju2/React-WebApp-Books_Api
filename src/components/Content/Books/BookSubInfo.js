import React, { Component } from "react";
import StarRating from "react-rating";
import API_CALLS from "../../Utils/APICalls";

const { GR_KEY, GR_API, GR_ISBN_QRY, GR_RVW_QRY } = API_CALLS["GR"];
const CORS = "https://cors-anywhere.herokuapp.com/";

class BookSubInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      id: ""
    };
  }
  componentDidMount() {
    let isbn = this.props.isbn;
    if (this.props.type === "book") {
      fetch(CORS + GR_API + GR_ISBN_QRY + isbn + "?key=" + GR_KEY)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            let author = this.props.author.replace(/\s/g, "+");
            let title = this.props.title.replace(/\s/g, "+");
            return fetch(
              CORS +
                GR_API +
                "book/title.xml?author=" +
                author +
                "&key=" +
                GR_KEY +
                "&title=" +
                title
            ).then(response => response.text());
          }
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          let id = data.querySelector("book id").textContent;
          let avgRating = data.querySelector("average_rating").textContent;
          this.setState({ rating: avgRating, id: id });
        });
    } else {
      fetch(CORS + GR_API + GR_RVW_QRY + isbn + "&key=" + GR_KEY)
        .then(response => response.json())
        .then(data => {
          let id = data.books[0].id;
          let avgRating = data.books[0].average_rating;
          this.setState({ rating: avgRating, id: id });
        });
    }
  }
  render() {
    if (this.props.rating !== 0) {
      this.props.isBkRdy();
    }
    return (
      <div className="book-container__sub-info">
        <a
          className="book-buy-link"
          href={this.props.buyLnk.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Buy this Book
        </a>
        <div className="sub-info__rating">
          {this.state.rating === 0 ? (
            "No Rating Available"
          ) : (
            <div>
              <StarRating
                className="book-container__ratings"
                initialRating={this.state.rating}
                emptySymbol="far fa-star fa-lg"
                fullSymbol="fas fa-star fa-lg"
                fractions={2}
                readonly
              />
              {this.state.rating}
            </div>
          )}
        </div>
        <a
          href={"https://www.goodreads.com/book/show/" + this.state.id}
          rel="noopener noreferrer"
          target="_blank"
        >
          Read Reviews
        </a>
      </div>
    );
  }
}

export default BookSubInfo;
