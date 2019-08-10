import React from 'react';

class Article extends React.Component {
    render() {

        let hoursDiff = (Date.now() - Date.parse(this.props.publish_date)) / 1000 / 3600;
        let daysDiff = hoursDiff / 24;
        return <li className="article-banner">
            <div>
                <img width={200} height={"auto"} src={this.props.img_url} />
            </div>
            <div onClick={() => window.location = this.props.url}>
                <h1>
                    {this.props.title}
                </h1>
                <p>
                    {this.props.description}
                </p>
                <p>
                    Published {daysDiff >= 1 ? parseInt(daysDiff) + " days," : ""} {parseInt(hoursDiff % 24)} hours ago
                </p>
            </div>
        </li >
    }
}

export default Article;