
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCitiesContext } from '../contexts/CitiesContext'


function Map() {
    //useNavigate
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { cities } = useCitiesContext()
    setMapPosition
    useSearchParams
    //useSearchParams is a custom hook
    const [searchParams] = useSearchParams()


    const lat = searchParams.get('lat')
    const lng = searchParams.get('long')

    useEffect(function () {
        if (lat && lng) setMapPosition([lat, lng])
    }, [lat, lng])
    return (
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
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
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div >
    )
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map
