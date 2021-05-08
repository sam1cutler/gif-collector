import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function TrendingList() {

    const API_KEY = '8w866KAjfH8dR7Nqp2AXitvr9xf2CZ5S'

    const [ gifList, setGifList ] = useState( [] );
    // const [ sortPriority, setSortPriority ] = useState( null );

    function doTheSorting(type) {
        console.log('sorting');

        let orderedList = gifList;


        gifList.sort( function(a, b) {
            const c = new Date(a[type]);
            const d = new Date(b[type]);
            return d-c
        })

        console.log(orderedList);

        setGifList(orderedList);

    }

    function handleImportClick() {
        console.log('it did import')
        doTheSorting('import_datetime');
    }

    function handleTrendingClick() {
        console.log('it did trending')
        doTheSorting('trending_datetime');
    }

    function handleTitleClick() {

        console.log('it did title')

        let orderedList = gifList;

        gifList.sort( function(a, b) {
            const c = a.title;
            const d = b.title;
            return c-d
        })

        setGifList(orderedList);
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