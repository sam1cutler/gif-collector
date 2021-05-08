import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// if I wanted to have the ordering persist, even after clicking to individual GIF pages and then going "back"...
// I'd probably use context. Establish context in the App component...
//    --> do the Trending API call in the App component
//    --> have clicks of the filter buttons modify ordering in context
//    --> have the GifDetails component access context, rather than a fresh API call
// This approach would, overall, radically reduce the # of API calls.
// Would probably also want to add a button in the TrendingList component to allow user to manual refresh,
//    = fresh API call, to check to see if Trending list has changed since last page load.
// That API call would be its own function, rather than within the useEffect... OR, I could add a 
//    "user requested reload" kinda thing in state, and have the useEffect block re-fire when that thing changes ?

function TrendingList() {

    const API_KEY = '8w866KAjfH8dR7Nqp2AXitvr9xf2CZ5S'

    const [ gifList, setGifList ] = useState( [] );
    const [ importDirection, setImportDirection ] = useState( -1 );
    const [ trendingDirection, setTrendingDirection ] = useState( -1 );
    const [ titleDirection, setTitleDirection ] = useState( 1 );

    function doTheSorting(type, direction) {

        let orderedList = gifList;

        orderedList.sort( function(a, b) {
            const c = new Date(a[type]);
            const d = new Date(b[type]);

            let answer = 0;
            if (direction < 0) {
                answer = d-c;
            } else if (direction > 0) {
                answer = c-d;
            }      
            return answer;
        })

        setGifList(orderedList);

    }

    function handleImportClick() {
        doTheSorting('import_datetime', importDirection);

        if (importDirection < 0) {
            setImportDirection(1);
        } else if (importDirection > 0) {
            setImportDirection(-1);
        }
    }

    function handleTrendingClick() {
        doTheSorting('trending_datetime', trendingDirection);

        if (trendingDirection < 0) {
            setTrendingDirection(1);
        } else if (trendingDirection > 0) {
            setTrendingDirection(-1);
        }
    }

    function handleTitleClick() {

        console.log('it did title');

        let orderedList = gifList;

        orderedList.sort( function(a, b) {
            const c = a.title;
            const d = b.title;

            console.log(c-d);

            let answer = 0;

            if (c < d) {
                if (titleDirection > 0) {
                    answer = -1
                } else if (titleDirection < 0) {
                    answer = 1;
                }
            } else if ( d < c ) {
                if (titleDirection > 0) {
                    answer = 1
                } else if (titleDirection < 0) {
                    answer = -1;
                } 
            } 

            return answer;
        })

        setGifList(orderedList);

        if (titleDirection > 0) {
            setTitleDirection(-1);
        } else if (titleDirection < 0) {
            setTitleDirection(1);
        }
    }
    

    useEffect( () => {

        fetch (`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(responseJson => setGifList(responseJson.data))

    }, [] )

    function renderGifList(listOfGifs) {

        return listOfGifs.map( activeGif => {
            
            const gifId = activeGif.id
            const previewGifUrl = activeGif.images.preview_gif.url;
            const gifAlt = activeGif.title;
            const gifImportDate = activeGif.import_datetime;
            const gifTrendingDate = activeGif.trending_datetime;

            return (
                <Link
                    key={gifId}
                    className='individual-gif'
                    to={`/gif/${gifId}`}
                >
                    <img src={previewGifUrl} alt={gifAlt} />
                    <p>{gifAlt}</p>
                    <p>{gifImportDate}</p>
                    <p>{gifTrendingDate}</p>
                </Link>
            )
        })

    }

    return (
        <div className='content-container'>
            <h2>Trending GIFs...</h2>
            <div className='sort-box'>
                <h3>Sort by...</h3>
                <div className='sort-options-container'>
                    <button onClick={handleImportClick}>Import Date</button>
                    <button onClick={handleTrendingClick}>Trending Date</button>
                    <button onClick={handleTitleClick}>Title</button>
                </div>

            </div>
            <div className='gif-list'>
                { !gifList[0]
                    ? <h3>Loading...</h3>
                    : renderGifList(gifList)}
            </div>
        </div>
    )

}

export default TrendingList;