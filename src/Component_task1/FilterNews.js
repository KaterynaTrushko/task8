import React, { useState } from "react";
import { useRef } from "react";
import PropTypes from "prop-types";

export default function FilterNews(props) {
  const refCheckbox = useRef([]);

  const { checkbox, authors, setSearchAuthor, setSearchHash } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeTitle = (e) => {
    // console.log(e.target.value);
    props.setSearchTitle(e.target.value);
  };

  const hendleChangeAuthor = (e) => {
    console.log(e.target.value);
    props.setSearchAuthor(e.target.value);
  };

  const hendleChangeHash = (e) => {
    let item = e.target.value;
    let arrHash = refCheckbox.current;
    console.log(arrHash);
    if (arrHash.includes(item)) {
      let newHash = arrHash.filter(el => el !== item);
      refCheckbox.current = newHash;
      setSearchHash(refCheckbox.current);
      console.log(refCheckbox.current);
    } else {
      arrHash.push(item);
      refCheckbox.current = arrHash;
      setSearchHash(refCheckbox.current);
      console.log(refCheckbox.current);
    }
  } 




  

  return (
    <>

      <div className="item">
      filrer 
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" onChange={handleChangeTitle} />
        </form>

         <b>author: </b>{authors.map(item => (
          <label key={item}><input type='radio' name="author" value={item} onChange={hendleChangeAuthor}/>{item}</label>
        ))}
        <b>hashtag: </b>{checkbox.map(item => (
          <label key={item}><input type='checkbox' onChange={hendleChangeHash} value={item} />{item}</label>
        ))}
      </div>
    </>
  );
}

FilterNews.propType = {
  setSearchTitle: PropTypes.func,
  setSearchAuthor: PropTypes.func,
  setSearchHash: PropTypes.func,
  checkbox: PropTypes.arrayOf(PropTypes.string),
  authors: PropTypes.string,
};

FilterNews.defaultProps = {
  setSearchTitle: () => {},
  setSearchAuthor: () => {},
  setSearchHash: () => {},
  checkbox: [],
  authors: "",
};
