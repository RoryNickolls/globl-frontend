import React, { useEffect, useState } from 'react';
import './App.css';
import Article from './components/Article/Article';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'


const SearchBar = ({ onInput }) => {
  return <input className="search-bar" type="text" onKeyUp={evt => onInput(evt.target.value)}></input>
}

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "lightgrey",
    marginBottom: "2vh",
  },
}));

const App = () => {

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const classes = useStyles();
  const moreArticles = async () => {
    const url = searchQuery === "" ? "http://localhost:8000/articles?offset=" + articles.length : "http://localhost:8000/articles?query=" + searchQuery + "&offset=0"
    const res = await axios(url);
    setArticles(articles.concat(res.data));
    setLoadingArticles(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', evt => {
      if (document.documentElement.scrollHeight <= (document.documentElement.scrollTop + (window.innerHeight * 2))) {
        // Hit the bottom, give me more articles!
        setLoadingArticles(true);
      }
    });

    moreArticles();
  }, []);

  useEffect(() => {
    if (loadingArticles) {
      moreArticles();
    }
  }, [loadingArticles]);

  return (
    <div className="App">
      <div className="flex-container">
        <AppBar className={classes.appBar} position="static">
          <Typography variant="h3" className="app-header-title">globl</Typography>
        </AppBar>
        <SearchBar onInput={val => this.updateSearchQuery(val)} />
        <ol className="article-list">
          {articles.map(
            (articleId, index) =>
              <li key={index}><Article id={articleId} /></li>
          )}
        </ol>
      </div>
    </div >
  );
}


export default App;
