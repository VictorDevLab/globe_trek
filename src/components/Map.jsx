
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { useState } from 'react'
import { useCitiesContext } from '../contexts/CitiesContext'


function Map() {
    //useNavigate
    const [mapPosition, setMapPosition] = useState([40, 0])
    const navigate = useNavigate()
    const { cities } = useCitiesContext()
    setMapPosition
    useSearchParams
    //useSearchParams is a custom hook
    // const [searchParams, setSearchParams] = useSearchParams()

    // const lat = searchParams.get('lat')
    // const lng = searchParams.get('long')
    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    cities.map((city) => (
                        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    )
}

export default Map
