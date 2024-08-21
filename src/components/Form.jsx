// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { useCitiesContext } from "../contexts/CitiesContext";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("")

  const { addCity, loading } = useCitiesContext()
  const navigate = useNavigate()


  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true)
          const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
          const data = await res.json()
          console.log("data", data)
          setCityName(data.city || data.locality || "")
          setEmoji(convertToEmoji(data.countryCode))
        } catch (err) {
          console.log("my error", err)
        } finally {
          setIsLoadingGeoCoding(false)
        }
      }
      fetchCityData()
    }, [lat, lng])

  async function handleSubmit(e) {
    e.preventDefault()
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat, lng
      }
    }

    await addCity(newCity)
    navigate('/app/cities')
  }
  isLoadingGeoCoding
  return (
    <form className={`${styles.form} ${loading ? styles.loading : ""} `} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={date => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e) => {
          // prevent the form from refreshing the page
          e.preventDefault()
          navigate(-1)
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
