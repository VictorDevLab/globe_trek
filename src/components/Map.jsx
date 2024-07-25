
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'


function Map() {
    //useNavigate

    const navigate = useNavigate()

    //useSearchParams is a custom hook
    const [searchParams, setSearchParams] = useSearchParams()

    const lat = searchParams.get('lat')
    const lng = searchParams.get('long')
    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            map
            <p>latitude: {lat}</p>
            <p>longitude: {lng}</p>
            <p>{setSearchParams}</p>
        </div>
    )
}

export default Map
