import React from "react";
import FlightForm from '../components/flight-form/flight-form'
import '../styles/home.css'

const Landing = () => {
  return (
    <main className="landing-wrapper">
      <div>
        <h1 className="title-landing">
          Discover The World: <br />
          Book Your Flight Today!
        </h1>

        <FlightForm />
      </div>
    </main>
  );
};

export default Landing;