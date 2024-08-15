import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./assets/hooks/useFetch";
import getRandomNumber from "./assets/helpers/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import getNumbers from "./assets/helpers/getNumbers";

function App() {
  const [locationID, setLocationID] = useState(getRandomNumber(126));
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://rickandmortyapi.com/api/location/${locationID}`;
  const [location, getLocation, hasError, isLoading] = useFetch(url);
  const [locations, getLocations, hasErrorLocations, isLoadingLocations] =
    useFetch(`https://rickandmortyapi.com/api/location/${getNumbers()}`);
  useEffect(() => {
    getLocation();
  }, [locationID]);
  useEffect(() => {
    getLocations();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputName.current.value.trim();
    const selectedLocation = locations.find(
      (location) => location.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (inputValue) {
      setLocationID(selectedLocation ? selectedLocation.id : null);
      setErrorMessage(
        selectedLocation ? "" : "No location found with that name!"
      );
    } else {
      setErrorMessage(inputValue ? "" : "You must put a location name");
    }
  };

  const inputName = useRef();
  return (
    <div className="app flex-container">
      <header className="app__hero">
        <img className="hero__image" src="/img/hero.png" alt="Hero Image" />
      </header>
      <section className="app__body">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form__input"
            type="text"
            placeholder="Search location name"
            ref={inputName}
            list="locations"
          />
          <datalist id="locations">
            {isLoadingLocations ? (
              <option>Loading...</option>
            ) : (
              locations?.map((location) => (
                <option value={location.name} key={location.id}></option>
              ))
            )}
          </datalist>
          <button className="form__btn">Search</button>
        </form>
        {isLoading ? (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : errorMessage ? (
          <h1>❌{errorMessage}</h1>
        ) : (
          <>
            <LocationInfo location={location} />
            <section className="cards__container flex-container">
              {location?.residents?.map((url) => (
                <ResidentCard key={url} url={url} />
              ))}
            </section>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
