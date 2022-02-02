import React from "react";
import PropTypes from "prop-types";
import ItemNews from "./ItemNews";

export default function ListNews(props) {
  const {news, authors, checkbox, removeNews} = props;
  console.log(news);

  return (
    <>
      {news.map((el) => (
        <div className="item" key={el.id}>
          <ItemNews 
          el={el}
          checkbox={checkbox}
          authors={authors}
          removeNews={removeNews} />
        </div>
      ))}
    </>
  );
}

ListNews.propType = {
 news : PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string,
        content: PropTypes.string,
        checkbox: PropTypes.arrayOf(
            PropTypes.string,
      ),
        photo:PropTypes.string,
        author: PropTypes.string,
      }
    )
  ),
  authors: PropTypes.arrayOf(PropTypes.string),
  checkbox: PropTypes.arrayOf(PropTypes.string),
  removeNews: PropTypes.func,

}

ListNews.defaultProps = {
  news : [],
  authors:[],
  checkbox:[],
  removeNews: ()=>{}
}
