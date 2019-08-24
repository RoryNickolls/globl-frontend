import React, { useState, useEffect } from 'react';
import './Article.css';

const Article = ({ id }) => {

    const [data, setData] = useState({});

    useEffect(() => {
        const url = "http://localhost:8000/articles/" + id;
        fetch(url).then(res => res.json()).then(json => {
            setData(json);
        }).catch(error => console.log(error))
    }, []);

    const onClickReliable = () => {
        const url = "http://localhost:8000/vote/reliable/" + data.id;
        fetch(url, { method: "POST" }).then(res => res.json()).then(json => {
            setData(json);
        });
    }

    const onClickControversial = () => {
        const url = "http://localhost:8000/vote/controversial/" + data.id;
        fetch(url, { method: "POST" }).then(res => res.json()).then(json => {
            setData(json);
        });
    }

    const onClickInteresting = () => {
        const url = "http://localhost:8000/vote/interesting/" + data.id;
        fetch(url, { method: "POST" }).then(res => res.json()).then(json => {
            setData(json);
        });
    }

    let hoursDiff = (Date.now() - Date.parse(data.publish_date)) / 1000 / 3600;
    let daysDiff = hoursDiff / 24;

    return <li className="banner">
        <div className="banner img">
            <img alt={data.title} width={"200"} height={"auto"} src={data.img_url} />
        </div>
        <div className="banner content" onClick={() => window.open(data.url)}>
            <h1>
                {data.title}
            </h1>
            <p>
                {data.description}
            </p>
            <p>
                Published {daysDiff >= 1 ? parseInt(daysDiff) + " days," : ""} {parseInt(hoursDiff % 24)} hours ago
                </p>
        </div>
        <div className="banner voting">
            <p onClick={onClickReliable}>Reliable {data.reliable_votes}</p>
            <p onClick={onClickControversial}>Controversial {data.controversial_votes}</p>
            <p onClick={onClickInteresting}>Interesting {data.interesting_votes}</p>
        </div>
    </li>
}

export default Article;