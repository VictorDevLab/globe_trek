
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCitiesContext } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'


function Map() {
    //useNavigate
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { cities } = useCitiesContext()
    // custom hook 
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation()

    setMapPosition
    useSearchParams
    //my custom hook
    const [lat, lng] = useUrlPosition()
    useEffect(function () {
        if (lat && lng) setMapPosition([lat, lng])
    }, [lat, lng])

    useEffect(

        function () {

            if (geoLocationPosition && geoLocationPosition.lat && geoLocationPosition.lng) {

                setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);

            }

        },

        [geoLocationPosition]

    );
    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={() => getPosition}>
                {isLoadingPosition ? "Loading..." : "Use Your Position"}
            </Button>
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
            console.log("bug?", e)
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map
