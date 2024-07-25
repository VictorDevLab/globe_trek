import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'

function CountryList({ cities, loading }) {

    if (loading) return <Spinner />
    if (!cities.length) return <Message message="Add your first city by clicking a city on the map" />

    //derive counties

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }, [])


    return (
        <ul className={styles.countryList}>
            {
                countries.map((country) => (
                    <CountryItem country={country} key={country.country} />
                ))
            }
        </ul>
    )
}

export default CountryList
