import React, { useState } from 'react';
import  { useRef } from 'react';
import  { useEffect } from 'react';
import PropTypes from 'prop-types';


export default function FormNews(props) {
  const refTitle = useRef(false);
  const refContent = useRef('');
  const refPhoto = useRef('');
  const refAuthor = useRef('');
  const refCheckbox = useRef([]);


  const [titleError, setTitle] = useState(false);
  const [contentError, setContent] = useState(false);
  const [photoError, setPhoto] = useState(false);
  const [authorError, setAuthor] = useState(false);
  const [checkboxError, setCheckbox] = useState(false);


  const { authors, checkbox, addNews } = props;

  function handleSubmit(e) {
    e.preventDefault();
  }

  function getBase64(file, onSuccess = () => { }, onError = () => { }) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      onSuccess(reader.result);
    };
    reader.onerror = function (error) {
      onError('Error: ', error);
    };
  }

  function handleChangePhoto(e) {
    const file = e.currentTarget.files[0];
    getBase64(file, (base64) => {
      refPhoto.current = base64;
      console.log(refPhoto.current);
    })

  };

  function hendleHash(e) {
    let item = e.target.value;
    let arrHash = refCheckbox.current;
    console.log(arrHash);
    if (arrHash.includes(item)) {
      let newHash = arrHash.filter(el => el !== item);
      console.log(newHash);
      return refCheckbox.current = newHash;
    } else {
      arrHash.push(item);
      console.log(arrHash);
      return refCheckbox.current.value = arrHash;
    }
  }


  function hendleAuthor(e) {
    let item = e.target.value;
    refAuthor.current = item;
  }

  useEffect(()=>{},[titleError, contentError, photoError, authorError, checkboxError])

  
  function ValidateTitile(title) {
    if (title) {
      setTitle(false);
      return true;
    } else {
      setTitle(!titleError);
      return false;
    }
  }

  function ValidateContent(content) {
    if (content) {
      setContent(false);
      return true;
    } else {
      setContent(!contentError);
      return false;
    }
  }

  function ValidateAuthor(author) {
    if (author) {
      setAuthor(false);
      return true;
    } else {
      setAuthor(!authorError);
      return false;
    }
  }

  function ValidateCheckbox(box) {
    if (box) {
      setCheckbox(false);
      return true;
    } else {
      setCheckbox(!checkboxError);
      return false;
    }
  }

  function ValidatePhoto(file) {
    if (file) {
      setPhoto(false);
      return true;
    } else {
      setPhoto(!photoError);
      return false;
    }
  }

  function hendleClick() {
    let d = new Date();
    let id = d.getTime().toString();

    let obj = {
      'id': id,
      title: refTitle.current.value,
      content: refContent.current.value,
      checkbox: refCheckbox.current,
      photo: refPhoto.current,
      author: refAuthor.current,
    };

      console.log(obj);


    if (ValidateTitile(refTitle.current.value) && ValidateContent(refContent.current.value)
    && ValidateAuthor(refAuthor.current) && ValidateCheckbox(refCheckbox.current.length > 0) &&
    ValidatePhoto(refPhoto.current)){

    let obj = {
      'id': id,
      title: refTitle.current.value,
      content: refContent.current.value,
      checkbox: refCheckbox.current,
      photo: refPhoto.current,
      author: refAuthor.current,
    };
      addNews(obj);
      console.log(obj);
    } else {
      return;
    }
  }


  return (
    <>
      <form className='item' onSubmit={handleSubmit}>
        <div><b>title: </b><input ref={refTitle} type="text" name="title" placeholder={titleError? 'Title Eror': null}/></div>
        <div><input type="file" name="photo" style={{margin: "5px",
        }} onChange={handleChangePhoto} />{photoError? <p style={{color:"red"}}>Photo Eror</p> : null}</div>
        <div><b>content: </b><textarea ref={refContent} type="text" name="title" placeholder={contentError? 'Content Eror': null} /></div>
        <div><b>author: </b>{authors.map(item => (
          <label key={item}><input type='radio' name="author" value={item} onChange={hendleAuthor}/>{item}</label>
        ))}{authorError? <p style={{color:"red"}}>Author Eror</p> : null}</div>
        <div><b>hashtag: </b>{checkbox.map(item => (
          <label key={item}><input type='checkbox' onChange={hendleHash} value={item} />{item}</label>
        ))}{checkboxError? <p style={{color:"red"}}>Checkbox Eror</p> : null}</div>
        <div><button type="submit" className="button" onClick={hendleClick}>Add news</button></div>
      </form>
    </>
  )
}



FormNews.propType = {
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

FormNews.defaultProps = {
  el: {},
  authors: [],
  checkbox: [],

};
