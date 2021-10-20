import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './ComicStrip.css';

function ComicStrip() {

    const [comic, setComic] = React.useState({});
    const [counter, setCounter] = React.useState(1);
    const { id } = useParams();

    React.useEffect(async () => {
        const fetchComic = async () => {

            const result = await axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${id || counter}/info.0.json`)
            setComic(result.data)

        }
        fetchComic()
    }, [])

    const getNextImage = async () => {
        const temp = counter + 1;
        const result = await axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${temp}/info.0.json`)
        setComic(result.data)
        setCounter(temp);
    }

    const getPreviousImage = async () => {
        const temp = counter - 1;
        if (temp >= 1) {
            const result = await axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${temp}/info.0.json`)
            setComic(result.data)
        }
        setCounter(temp);

    }
    const getLatestImage = async () => {
        const result = await axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json`)
        setComic(result.data)
    }
    const getRandomImage = async () => {
        const random = Math.floor(Math.random() * 1000)
        console.log(random)
        const result = await axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${random}/info.0.json`)
        setComic(result.data)
    }

    return (
        <>
            <h1>Comic Strips</h1>
            <h4>{comic.safe_title}</h4>
            <div className="image__container">

                <button className="control-btns btn-prev" onClick={() => getPreviousImage()}><FiChevronLeft style={{ marginRight: '10px' }} /> Prev</button>
                <img src={comic.img} alt={comic.alt} className="image" />
                <button className="control-btns btn-next" onClick={() => getNextImage()}> Next <FiChevronRight style={{ marginLeft: '10px' }} /> </button>
            </div>
            <div className="transcript__container">

                <p className="transcript">{comic.transcript}</p>
            </div>
            <p className="date">Date: {comic.day} / {comic.month} / {comic.year}</p>
            <div className="button__container">

                <button className="control-btns btn-latest" onClick={() => getLatestImage()}>Latest</button>
                <button className="control-btns btn-random" onClick={() => getRandomImage()}>Random</button>
            </div>
        </>
    );
}

export default ComicStrip;