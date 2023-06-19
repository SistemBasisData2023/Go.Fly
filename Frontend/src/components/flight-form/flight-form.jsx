import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiUserFill } from "react-icons/ri";

import axios from "axios";
import { LuCalendarDays } from "react-icons/lu";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Form } from "reactstrap";
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
  const [popDeparture, setPopDeparture] = React.useState("");
  const [popArrival, setPopArrival] = React.useState("");
  const [popDate, setPopDate] = React.useState("");
  const [popPeople, setPeople] = React.useState("");
  const [ttlPeople, setTtlPeople] = React.useState(1);
const navigate = useNavigate();

  const handleDeparture = (e) => {
    console.log(e.target.value);
    setPopDeparture(e.target.value);
  };
  const handleArrival = (e) => {
    setPopArrival(e);
  };

  const handleSearch = async () => {
    try {
      const body = {
        departureAirport: popDeparture,
        arrivalAirport: popArrival,
      };

      console.log(body);
      const { data } = await axios.get(
        "http://localhost:3000/flights/search",
        body
      );
      
      console.log(data);
      alert("Search Successful!");
      // Extract user and store it in localStorage
      localStorage.setItem("searchFlight","true");
      
      // navigate("/search");
  
    } catch (error) {
      console.log(error);
      // Handle login failure
      alert("Check your username or email!");
      console.error("Login failed:", error.message);
    }
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <form className="landing-form" >
      <div className="input-container">
        <input
          id="departure"
          name="departure"
          type="text"
          placeholder="From where?"
          onChange={handleDeparture}
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
          id="arrival"
          name="arrival"
          type="text"
          placeholder="Where to?"
          onChange={handleArrival}
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
      <button className="btn-plus-minus">
        Search
      </button>
      </Link>
    </form>
  );
};

export default FlightForm;
