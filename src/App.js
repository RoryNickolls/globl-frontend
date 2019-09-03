import React, { useEffect, useState } from 'react';
import './App.css';
import Article from './components/Article/Article';
import { Typography, AppBar, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'


const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "skyblue",
    marginBottom: "2vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appBarTitle: {
    alignSelf: "center",
    paddingLeft: "2vh",
  },
  page: {
    backgroundColor: "gray",
  },
  searchBar: {
    width: "50%",
  },
}));

const SearchBar = ({ onInput }) => {
  const classes = useStyles();
  return <TextField label="Search" margin="dense" className={classes.searchBar} onKeyUp={evt => onInput(evt.target.value)} />
}

const App = () => {

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const classes = useStyles();
  const moreArticles = async (override) => {
    const url = searchQuery === "" ? "http://localhost:8000/articles?offset=" + articles.length : "http://localhost:8000/articles?query=" + searchQuery + "&offset=" + articles.length
    const res = await axios(url);

    let newArticles = res.data;

    if (override) {
      setArticles(newArticles);
    } else {
      setArticles(articles.concat(newArticles));
    }

    setLoadingArticles(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', evt => {
      if (document.documentElement.scrollHeight <= (document.documentElement.scrollTop + (window.innerHeight * 2))) {
        // Hit the bottom, give me more articles!
        setLoadingArticles(true);
      }
    });
  }, []);

  useEffect(() => {
    moreArticles(true);
  }, [searchQuery]);

  useEffect(() => {
    if (loadingArticles) {
      moreArticles(false);
    }
  }, [loadingArticles]);

  return (
    <div className="App">
      <div className="flex-container">
        <AppBar className={classes.appBar} position="static">
          <Typography variant="h5" className={classes.appBarTitle}>globl</Typography>
          <SearchBar onInput={val => setSearchQuery(val)} />
          <div></div>
        </AppBar>
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
