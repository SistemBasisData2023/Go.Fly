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
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    gender gender_type NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    country TEXT NOT NULL REFERENCES country(two_letter),
    province TEXT NOT NULL REFERENCES subcountry(subcountry_name),
    password VARCHAR(100) NOT NULL,
    isadmin BOOLEAN
);


CREATE TABLE IF NOT EXISTS airports (
	code VARCHAR(50) PRIMARY KEY,
	name VARCHAR(200),
	cityCode VARCHAR(50),
	cityName VARCHAR(200),
	countryName VARCHAR(200),
	country TEXT NOT NULL REFERENCES country(two_letter),
	timezone VARCHAR(8),
	lat VARCHAR(32),
	lon VARCHAR(32),
	numAirports INTEGER
);

CREATE TABLE Aircraft_model (
    aircraft_id SERIAL PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL
);
INSERT INTO Aircraft_model (model, manufacturer, capacity)
VALUES
('Airbus A220', 'Airbus', 160),
('Airbus A300', 'Airbus', 266),
('Airbus A310', 'Airbus', 280),
('Airbus A318', 'Airbus', 132),
('Airbus A319', 'Airbus', 156),
('Airbus A320', 'Airbus', 185),
('Airbus A321', 'Airbus', 236),
('Airbus A330', 'Airbus', 440),
('Airbus A340', 'Airbus', 440),
('Airbus A350', 'Airbus', 440),
('Airbus A380', 'Airbus', 853),
('Airspeed Ambassador', 'Airspeed', 47),
('ATR 42', 'ATR', 50),
('ATR 72', 'ATR', 78),
('BAC One-Eleven', 'BAC', 119),
('Beechcraft 1900', 'Beechcraft', 19),
('Boeing 247', 'Boeing', 10),
('Boeing 307', 'Boeing', 33),
('Boeing 377', 'Boeing', 100),
('Boeing 707/720', 'Boeing', 219),
('Boeing 717', 'Boeing', 134),
('Boeing 727', 'Boeing', 189),
('Boeing 737', 'Boeing', 215),
('Boeing 747', 'Boeing', 660),
('Boeing 757', 'Boeing', 295),
('Boeing 767', 'Boeing', 375),
('Boeing 777', 'Boeing', 550),
('Boeing 787', 'Boeing', 330),
('Bombardier CRJ200', 'Bombardier', 50),
('Bombardier CRJ700', 'Bombardier', 78),
('Bombardier Dash 8', 'Bombardier', 90),
('Bristol Brabazon', 'Bristol', 100),
('Bristol Britannia', 'Bristol', 139),
('British Aerospace 146', 'British Aerospace', 112),
('British Aerospace ATP', 'British Aerospace', 72),
('British Aerospace Jetstream', 'British Aerospace', 19),
('British Aerospace Jetstream 41', 'British Aerospace', 29);
--=====================================================================
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
    booking_id UUID PRIMARY KEY,
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



CREATE TABLE Airplane_Instances (
    airplane_instance_id SERIAL PRIMARY KEY,
    airplane_id INTEGER REFERENCES Airplanes(airplane_id),
    flight_id INTEGER REFERENCES Flights(flight_id)
);


