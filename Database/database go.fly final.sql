--=====================================================================
--COUNTRY
--=====================================================================
CREATE TABLE country (
    name TEXT NOT NULL,
    two_letter TEXT PRIMARY KEY,
    country_id integer NOT NULL
);
--=====================================================================
--SUBCOUNTRY
--=====================================================================
CREATE TABLE subcountry (
    country TEXT NOT NULL REFERENCES country(two_letter),
    subcountry_name TEXT NOT NULL,
    subdivision TEXT,
    subcountry_level TEXT,
    UNIQUE(country, subcountry_name)
);
--=====================================================================
--USERS
--=====================================================================-
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE gender_type AS ENUM (
    'Male'
    ,'Female'
);
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
--=====================================================================
--AIRPORTS
--=====================================================================
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
--=====================================================================
--AIRLINE LIST
--=====================================================================
CREATE TABLE Airline_list (
    id SERIAL PRIMARY KEY,
    IATA TEXT NOT NULL,
    ICAO TEXT NOT NULL,
    Airline TEXT NOT NULL,
    Callsign TEXT NOT NULL,
    country TEXT NOT NULL REFERENCES country(two_letter),
    logo TEXT,
    description TEXT
);
--=====================================================================
--AIRCRAFT MODEL
--=====================================================================
CREATE TABLE Aircraft_model (
    aircraft_id SERIAL PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    country TEXT NOT NULL REFERENCES country(two_letter)
);
INSERT INTO Aircraft_model (model, manufacturer, capacity, country)
VALUES
('Airbus A220', 'Airbus', 160, 'FR'),
('Airbus A300', 'Airbus', 266, 'FR'),
('Airbus A310', 'Airbus', 280, 'FR'),
('Airbus A318', 'Airbus', 132, 'FR'),
('Airbus A319', 'Airbus', 156, 'FR'),
('Airbus A320', 'Airbus', 185, 'FR'),
('Airbus A321', 'Airbus', 236, 'FR'),
('Airbus A330', 'Airbus', 440, 'FR'),
('Airbus A340', 'Airbus', 440, 'FR'),
('Airbus A350', 'Airbus', 440, 'FR'),
('Airbus A380', 'Airbus', 853, 'FR'),
('Airspeed Ambassador', 'Airspeed', 47, 'GB'),
('ATR 42', 'ATR', 50, 'FR'),
('ATR 72', 'ATR', 78, 'FR'),
('BAC One-Eleven', 'BAC', 119, 'GB'),
('Beechcraft 1900', 'Beechcraft', 19, 'US'),
('Boeing 247', 'Boeing', 10, 'US'),
('Boeing 307', 'Boeing', 33, 'US'),
('Boeing 377', 'Boeing', 100, 'US'),
('Boeing 707/720', 'Boeing', 219, 'US'),
('Boeing 717', 'Boeing', 134, 'US'),
('Boeing 727', 'Boeing', 189, 'US'),
('Boeing 737', 'Boeing', 215, 'US'),
('Boeing 747', 'Boeing', 660, 'US'),
('Boeing 757', 'Boeing', 295, 'US'),
('Boeing 767', 'Boeing', 375, 'US'),
('Boeing 777', 'Boeing', 550, 'US'),
('Boeing 787', 'Boeing', 330, 'US'),
('Bombardier CRJ200', 'Bombardier', 50, 'CA'),
('Bombardier CRJ700', 'Bombardier', 78, 'CA'),
('Bombardier Dash 8', 'Bombardier', 90, 'CA'),
('Bristol Brabazon', 'Bristol', 100, 'GB'),
('Bristol Britannia', 'Bristol', 139, 'GB'),
('British Aerospace 146', 'British Aerospace', 112, 'GB'),
('British Aerospace ATP', 'British Aerospace', 72, 'GB'),
('British Aerospace Jetstream', 'British Aerospace', 19, 'GB'),
('British Aerospace Jetstream 41', 'British Aerospace', 29, 'GB');
--=====================================================================
--FLIGHTS
--=====================================================================
CREATE TYPE flight_status AS ENUM ('On Time', 'Delayed', 'Departed', 'Arrived', 'Scheduled', 'Cancelled');

CREATE FUNCTION check_same_country() RETURNS TRIGGER AS $$
BEGIN
    IF (
        (SELECT country FROM airports WHERE code = NEW.departure_airport) = 
        (SELECT country FROM airline_list WHERE id = NEW.flight_airline_id)
    ) OR (
        (SELECT country FROM airports WHERE code = NEW.arrival_airport) = 
        (SELECT country FROM airline_list WHERE id = NEW.flight_airline_id)
    ) THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Departure or arrival airport is not located in the same country as the airline.';
    END IF;
END;
$$ LANGUAGE plpgsql;
CREATE FUNCTION check_seats_booked() RETURNS TRIGGER AS $$
DECLARE
    aircraft_capacity INTEGER;
BEGIN
    SELECT capacity INTO aircraft_capacity FROM aircraft_model WHERE aircraft_id = NEW.aircraft_id;
    
    IF NEW.seats_booked > aircraft_capacity THEN
        RAISE EXCEPTION 'Seats booked cannot exceed the aircraft capacity.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE flights (
    flight_id SERIAL PRIMARY KEY,
    flight_airline_id INTEGER NOT NULL REFERENCES airline_list(id),
    flight_no character(4) NOT NULL,
    aircraft_id INTEGER NOT NULL REFERENCES aircraft_model(aircraft_id),
    scheduled_departure timestamp with time zone NOT NULL,
    scheduled_arrival timestamp with time zone NOT NULL,
    departure_airport CHARACTER(3) NOT NULL REFERENCES airports (code),
    arrival_airport CHARACTER(3) NOT NULL REFERENCES airports (code),
    status flight_status NOT NULL,
    seats_booked INTEGER DEFAULT 0,
    actual_departure timestamp with time zone,
    actual_arrival timestamp with time zone,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT flights_check CHECK (scheduled_arrival > scheduled_departure),
    CONSTRAINT flights_check1 CHECK ((actual_arrival IS NULL) OR (actual_departure IS NOT NULL AND actual_arrival IS NOT NULL AND actual_arrival > actual_departure))
);

CREATE TRIGGER flights_same_country_trigger
BEFORE INSERT OR UPDATE ON flights
FOR EACH ROW
EXECUTE FUNCTION check_same_country();
CREATE TRIGGER flights_seats_booked_trigger
BEFORE INSERT OR UPDATE ON flights
FOR EACH ROW
EXECUTE FUNCTION check_seats_booked();
--=====================================================================
--BOOKINGS
--=====================================================================
-- Create the validate_seat_numbers trigger function
CREATE FUNCTION validate_seat_numbers(arr_len INT, seats_booked INT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN arr_len <= seats_booked;
END;
$$ LANGUAGE plpgsql;

-- Create a function to validate unique seat_numbers within the array
CREATE FUNCTION validate_unique_seat_numbers(seat_numbers INTEGER[]) RETURNS BOOLEAN AS $$
BEGIN
    RETURN seat_numbers = ARRAY(SELECT DISTINCT unnest(seat_numbers));
END;
$$ LANGUAGE plpgsql;

-- Create the validate_seat_numbers_capacity trigger function
CREATE FUNCTION validate_seat_numbers_capacity() RETURNS TRIGGER AS $$
DECLARE
    capacity INTEGER;
    booked_count INTEGER;
BEGIN
    SELECT capacity INTO capacity FROM Aircraft_model WHERE aircraft_id = (SELECT aircraft_id FROM flights WHERE flight_id = NEW.flight_id);

    booked_count := array_length(NEW.seat_numbers, 1);
    IF booked_count > capacity THEN
        RAISE EXCEPTION 'Seat numbers exceed the capacity of the aircraft.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the booking_status enum type
CREATE TYPE booking_status AS ENUM ('Unpaid', 'Booked');

-- Create the booking table
CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    flight_id INTEGER REFERENCES flights(flight_id),
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    seats_booked INTEGER DEFAULT 1,
    seat_numbers INTEGER[],
    status booking_status NOT NULL DEFAULT 'Unpaid',
    CONSTRAINT unique_booking UNIQUE (user_id, flight_id),
    CONSTRAINT check_seat_numbers CHECK (validate_seat_numbers(array_length(seat_numbers, 1), seats_booked)),
    CONSTRAINT check_unique_seat_numbers CHECK (validate_unique_seat_numbers(seat_numbers))
);

-- Create the validate_seat_numbers_capacity_trigger
CREATE TRIGGER validate_seat_numbers_capacity_trigger
    BEFORE INSERT OR UPDATE ON booking
    FOR EACH ROW
    EXECUTE FUNCTION validate_seat_numbers_capacity();
