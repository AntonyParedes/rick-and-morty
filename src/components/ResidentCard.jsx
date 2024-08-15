import { useEffect } from "react";
import useFetch from "../assets/hooks/useFetch";
import "./styles/ResidentCard.css";

const ResidentCard = ({ url }) => {
  const [resident, getResident, hasError, isLoading] = useFetch(url);

  useEffect(() => {
    getResident();
  }, []);

  return (
    <article className="resident">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <header className="resident__header">
            <img
              className="resident__image"
              src={resident?.image}
              alt={resident?.name}
            />
            <div className="resident__status-container flex-container">
              <div
                className={`resident__status-circle ${resident?.status}`}></div>
              <div className="resident__status">{resident?.status}</div>
            </div>
          </header>
          <section className="resident__body">
            <h3 className="resident__name">{resident?.name}</h3>
            <hr className="resident__hr" />
            <ul className="resident__list grid-container">
              <li className="resident__item grid-container">
                <span className="resident__label">Specie:</span>
                <span className="resident__value">{resident?.species}</span>
              </li>
              <li className="resident__item grid-container">
                <span className="resident__label">Origin:</span>
                <span className="resident__value">{resident?.origin.name}</span>
              </li>
              <li className="resident__item grid-container">
                <span className="resident__label">Episodes where appear:</span>
                <span className="resident__value">
                  {resident?.episode.length}
                </span>
              </li>
            </ul>
          </section>
        </>
      )}
    </article>
  );
};

export default ResidentCard;
