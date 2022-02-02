import React, {useEffect, useState} from "react";
import { newData } from "./news";
import ListNews from "./ListNews";
import { authors } from "./news";
import { checkbox } from "./news";
import FormNews from "./FormNews";
import FilterNews from "./FilterNews";




export default function MainNews(){ 

  const[news, setNews] = useState(newData);

  const[searchTitle, setSearchTitle] = useState(''); 
  
  const[searchAuthor, setSearchAuthor] = useState('');

  const[searchHash, setSearchHash] = useState([]);

  function removeNews(id){
    let newNews = news.filter(el => el.id !== id);
    setNews(newNews);
  }

  function addNews(obj){
    setNews([obj,...news])
  }

 

  useEffect(()=>{
    const filterNews = news.filter((el) => {
      if (searchTitle && el.title.toLowerCase().indexOf(searchTitle.toLowerCase()) < 0) return false;
      if (searchAuthor && el.author !== searchAuthor) return false;
      if (searchHash.length > 0 && searchHash.indexOf(el.checkbox[0]) < 0 ) return false;
      return true;
    });
   
    setNews(filterNews);
    
  },[searchTitle, searchAuthor, searchHash])

  
  return(
    <>
    {console.log(news)}
      <FormNews
        checkbox={checkbox}
        authors={authors}
        addNews={addNews}
      />
      <FilterNews
        checkbox={checkbox}
        authors={authors}
        setSearchTitle ={(title)=>setSearchTitle(title)}
        setSearchAuthor ={(author)=>{setSearchAuthor(author)}}
        setSearchHash ={(hash)=>{setSearchHash(hash)}}
        /> 
      <ListNews
        news={news}
        checkbox={checkbox}
        authors={authors}
        removeNews={removeNews}

      />
    </>
  )
}




