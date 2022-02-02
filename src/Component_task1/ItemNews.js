import React from "react";
import PropTypes from "prop-types";

export default function ItemNews(props) {

  const {el, authors, checkbox, removeNews} = props;


  
  return (
    <>
      <div><b>title: </b>{el.title}</div>
      <div>{el.photo? <img src={el.photo}></img>: null}</div>
      <div><b>content: </b>{el.content}</div>
      <div><b>author: </b>{authors.map(item=>(
        <label key={item}><input type='radio' checked={item === el.author ?true:false} readOnly/>{item}</label>
      ))}</div>
      <div><b>hashtag: </b>{checkbox.map(item=>(
        <label key={item}><input type='checkbox' checked={el.checkbox.includes(item) ? true:false} readOnly/>{item}</label>
      ))}</div>
      <div><button onClick={()=>removeNews(el.id)} className="button">Remove news</button></div>
    </>
  )
}

ItemNews.propType = {
  el: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    checkbox: PropTypes.arrayOf(PropTypes.string),
    photo: PropTypes.string,
    author: PropTypes.string,
  }),
  authors: PropTypes.arrayOf(PropTypes.string),
  checkbox: PropTypes.arrayOf(PropTypes.string),
  removeNews: PropTypes.func,
};

ItemNews.defaultProps = {
  el:{},
  authors:[],
  checkbox:[],
  removeNews: ()=>{}
};
