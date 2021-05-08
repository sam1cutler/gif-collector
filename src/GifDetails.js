import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GifDetails() {

    const [ gifInfo, setGifInfo ] = useState( {} );
    const { gifId } = useParams();

    const API_KEY = '8w866KAjfH8dR7Nqp2AXitvr9xf2CZ5S'    

    useEffect( () => {

        fetch(`http://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(responseJson => setGifInfo(responseJson.data));

    }, [] )

    function renderGifDetails(gifInfo) {

        // get info from gitInfo
        const { title, username } = gifInfo;
        const gifUrl = gifInfo.images.original.url;

        return (
            <div className='gif-details-container'>
                <h3>{title}</h3>
                <img src={gifUrl} alt={title}/>
                <p>{username}</p>
            </div>
        )
    }

    return (
        <div className='content-container'>
            <h2>Here's the GIF you ordered...</h2>
            {gifInfo['id'] === undefined
                ? <h3>Loading...</h3>
                : renderGifDetails(gifInfo)
            }
            
        </div>
    )

}

export default GifDetails;