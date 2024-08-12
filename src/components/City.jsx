import styles from "./City.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useEffect } from "react";
import ButtonBack from "../components/Button"
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function City() {

  const { id } = useParams()
  const { currentCity, getCity, loading } = useCitiesContext()



  const navigate = useNavigate()

  useEffect(() => {
    getCity(id)
  }, [id])
  const { cityName, emoji, date, notes } = currentCity;
  // const [searchParams, setSearchParams] = useSearchParams()

  // const lat = searchParams.get('lat')
  // const long = searchParams.get('long')
  if (loading) return <Spinner />
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack className={styles.buttonMine} type="back" onClick={(e) => {
          // prevent the form from refreshing the page
          e.preventDefault()
          navigate(-1)
        }}>
          &larr; Back
        </ButtonBack>
      </div>
    </div >
  );
}

export default City;
