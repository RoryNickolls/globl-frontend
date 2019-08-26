import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, Typography, Paper } from '@material-ui/core';
import './Article.css';

const useStyles = makeStyles(theme => ({
    button: {
        color: "lightgray",
    },
    contentText: {
        align: "left"
    }
}));

const Article = ({ id }) => {
    const classes = useStyles();
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

    if (Object.keys(data) <= 0) {
        return <Typography variant="h1">Loading...</Typography>
    }

    let hoursDiff = (Date.now() - Date.parse(data.publish_date)) / 1000 / 3600;
    let daysDiff = hoursDiff / 24;

    return <Paper className="banner">
        <div className="banner-img">
            <img alt={data.title} width={"200"} height={"auto"} src={data.img_url} />
        </div>
        <div className="banner-content" onClick={() => window.open(data.url)}>
            <Typography className={classes.contentText} variant="h4">
                {data.title}
            </Typography>
            <Typography variant="body2">
                {data.description}
            </Typography>
            <Typography variant="overline">
                Published {daysDiff >= 1 ? parseInt(daysDiff) + " days," : ""} {parseInt(hoursDiff % 24)} hours ago
            </Typography>
        </div>
        <div className="banner-voting">
            <Typography>Reliable <Button className={classes.button} onClick={onClickReliable}>{data.reliable_votes}</Button></Typography>
            <Typography>Controversial <Button className={classes.button} onClick={onClickControversial}>{data.controversial_votes}</Button></Typography>
            <Typography>Interesting <Button className={classes.button} onClick={onClickInteresting}>{data.interesting_votes}</Button></Typography>
        </div>
    </Paper>
}

export default Article;