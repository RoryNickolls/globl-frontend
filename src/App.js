import React from 'react';
import logo from './logo.svg';
import './App.css';
import Article from './Article';

class SearchBar extends React.Component {
  render() {
    return <input className="search-bar" type="text" onKeyUp={evt => this.props.onInput(evt.target.value)}></input>
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      retrieving_articles: false,
      articles: [],
      search_query: ""
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", (evt) => this.handleScroll(evt, this));
  }

  componentWillMount() {
    this.getArticles();
  }

  handleScroll(event, self) {
    if (document.documentElement.scrollHeight >= (document.documentElement.scrollTop + window.innerHeight) / 3) {
      // Hit the bottom, give me more articles!
      self.getArticles()
    }
  }

  getArticles() {
    if (this.state.retrieving_articles) {
      return;
    }

    this.setState({ retrieving_articles: true })
    const url = this.state.search_query === "" ? "http://localhost:8000/articles?offset=" + this.state.articles.length : "http://localhost:8000/articles?query=" + this.state.search_query + "&offset=0"
    fetch(url).then(res => res.json()).then(json => {
      this.setState({ retrieving_articles: false, articles: this.state.articles.concat(json) });
    }).catch(error => console.log(error));
  }

  updateSearchQuery(new_query) {
    this.setState({ articles: [] });
    this.setState({ search_query: new_query }, () => this.getArticles());
  }

  render() {
    let num = 0;
    return (
      <div className="App">
        <div className="flex-container">
          <div className="app-header">
            <b className="app-header-title">GLOBL</b>
            <div>
              <SearchBar onInput={val => this.updateSearchQuery(val)} />
            </div>
          </div>
          <div className="article-container">
            <ol className="article-list">
              {this.state.articles.map(
                article =>
                  <Article key={num++} title={article.title} description={article.description} url={article.url} img_url={article.img_url} publish_date={article.publish_date} />
              )}
            </ol>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
