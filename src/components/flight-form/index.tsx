import React from "react";
import { Link } from 'react-router-dom';
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiUserFill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
const airportName = [
  "SFO",
  "ATL",
  "STL",
  "LAX",
  "PVG",
  "MSP",
  "NRT",
  "IEK",
  "ERK",
];
const FlightForm = () => {
  const [popDeparture, setPopDeparture] = React.useState(false);
  const [popArrival, setPopArrival] = React.useState(false);
  const [popDate, setPopDate] = React.useState(false);
  const [popPeople, setPeople] = React.useState(false);
  const [ttlPeople, setTtlPeople] = React.useState(1);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <form className="landing-form">
      <div className="input-container">
        <input
          name="departure"
          type="button"
          defaultValue="From where?"
          onClick={() => setPopDeparture(!popDeparture)}
        />
        <span className="icon-input">
          <GiAirplaneDeparture />
        </span>
        <div
          className="pop-over"
          style={{ display: popDeparture ? "block" : "none" }}
        >
          {airportName.map((item, idx) => (
            <div id="airport" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          name="departure"
          type="button"
          defaultValue="Where to?"
          onClick={() => setPopArrival(!popArrival)}
        />
        <span className="icon-input">
          <GiAirplaneArrival />
        </span>
        <div
          className="pop-over"
          style={{ display: popArrival ? "block" : "none" }}
        >
          {airportName.map((item, idx) => (
            <div id="airport" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          name="departure"
          type="button"
          defaultValue="Depart - Return"
          onClick={() => setPopDate(!popDate)}
        />
        <span className="icon-input">
          <LuCalendarDays />
        </span>
        <div
          className=""
          style={{
            display: popDate ? "block" : "none",
            position: "absolute",
            zIndex: 2,
          }}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            numberOfCalendars={2}
            singleDateRange
            // selectionType="range"
            // onChange={handleSelect}
          />
        </div>
      </div>
      <div className="input-container">
        <input
          name="departure"
          type="button"
          defaultValue="1 Adult"
          onClick={() => setPeople(!popPeople)}
        />
        <span className="icon-input">
          <RiUserFill />
        </span>
        <div
          className="pop-over adult"
          style={{ display: popPeople ? "block" : "none" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              height: "100%",
              color: "#6E7491",
            }}
          >
            <p>Adults:</p>
            <div
              className="btn-plus-minus"
              onClick={() => {
                if (ttlPeople > 1) {
                  var temp = ttlPeople - 1;
                  setTtlPeople(temp);
                }
              }}
            >
              <AiOutlineMinus />
            </div>
            <div>{ttlPeople}</div>
            <div
              className="btn-plus-minus"
              onClick={() => {
                var temp = ttlPeople + 1;
                setTtlPeople(temp);
              }}
            >
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      </div>
      <Link to="/search">
      <button className="btn-search">Search</button>
      </Link>
    </form>
  );
};

export default FlightForm;
