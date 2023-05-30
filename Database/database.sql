CREATE TYPE gender_type AS ENUM (
    'Male'
    ,'Female'
);

CREATE TABLE country (
    name TEXT NOT NULL,
    two_letter TEXT PRIMARY KEY,
    country_id integer NOT NULL
);
CREATE TABLE subcountry (
    country TEXT NOT NULL REFERENCES country(two_letter),
    subcountry_name TEXT NOT NULL,
    subdivision TEXT,
    subcountry_level TEXT,
    UNIQUE(country, subcountry_name)
);
--
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    gender gender_type NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    country TEXT NOT NULL REFERENCES country(two_letter),
    province TEXT NOT NULL REFERENCES subcountry(subcountry_name),
    password VARCHAR(100) NOT NULL
);  

CREATE TABLE Flights (
    flight_id SERIAL PRIMARY KEY,
    airline_id INTEGER REFERENCES Airline_account(airline_id),
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    price NUMERIC(10, 2) NOT NULL   
);

CREATE TABLE Airline_account (
    airline_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country TEXT NOT NULL REFERENCES country(name),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL 
);

CREATE TABLE Bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    flight_id INTEGER REFERENCES Flights(flight_id),
    booking_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE Payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES Bookings(booking_id),
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL
);


CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    airline_id INTEGER REFERENCES Airline_account(airline_id),
    rating INTEGER NOT NULL,
    review_text TEXT NOT NULL,
    review_date TIMESTAMP NOT NULL
);

CREATE TABLE Airplanes (
    airplane_id SERIAL PRIMARY KEY,
    airline_id INTEGER REFERENCES Airlines(airline_id),
    model VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE Airplane_Instances (
    airplane_instance_id SERIAL PRIMARY KEY,
    airplane_id INTEGER REFERENCES Airplanes(airplane_id),
    flight_id INTEGER REFERENCES Flights(flight_id)
);

CREATE TABLE IF NOT EXISTS airports (
  code VARCHAR(50),
  name VARCHAR(200),
  cityCode VARCHAR(50),
  cityName VARCHAR(200),
  countryName VARCHAR(200),
  country TEXT NOT NULL REFERENCES country(two_letter),
  timezone VARCHAR(8),
  lat VARCHAR(32),
  lon VARCHAR(32),
  numAirports INTEGER,
  city BOOLEAN
);

CREATE TABLE Airports (
    airport_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country TEXT NOT NULL REFERENCES country(name),
    city VARCHAR(100) NOT NULL
);



