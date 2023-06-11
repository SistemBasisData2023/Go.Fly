# Go.Fly

![alt text](https://github.com/grandier/Blood-Works/blob/master/public/images/logo_bloodworks.png)
<p align="center">
  <i align="center">Book Your Flight Tickets Here! (SBD L12 Final Project)</i>
</p>

<p align ="center">
  <a href="#authors">Authors</a> •
  <a href="#introduction">Introduction</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#language-and-tools">Language and Tools</a> •
  <a href="#tables">Tables</a> •
  <a href="#flowchart">Flowchart</a> •
  <a href="#relational-table-and-uml">Relational Table and UML</a> 
</p>

## Authors

- [@jordinia](https://github.com/Jordinia) - 2106655034
- [@dyenta](https://www.github.com/dyenta) - 
- [@fatimakhairunnisa](hhttps://github.com/fatimakhairunnisa) - 

---
## Introduction
<p align="justify">Go.Fly is a flight booking platform that allows users to search, book, and manage flights easily. Whether you're planning a business trip or a vacation, Go.Fly provides a seamless and user-friendly experience to find the best flights at affordable prices.</p>

<p align="justify">Here's a breakdown of how CRUD is implemented in Go.Fly:</p>

### Create:
- Flight Creation: As an admin, you can create new flights by providing relevant details such as departure and arrival airports, departure date and time, airline information, and available seats. This allows you to add new flights to the system and make them available for users to search and book.
- User Registration: Users can create their accounts by providing necessary information like name, email, password, and contact details. This enables them to access personalized features, manage bookings, and enjoy a seamless booking experience.
### Read:
- Flight Search: Users can search for flights based on their preferred criteria such as departure and destination airports, dates, and other filters. The system retrieves and displays the relevant flights matching the search parameters, allowing users to explore available options.
- View Bookings: Users can view their booked flights, along with details like flight information, booking status, seat numbers, and booking date. This provides users with an overview of their current and past bookings.
### Update:
- Booking Modification: Users can modify their bookings, such as changing the flight date, updating passenger details, or requesting seat changes. This feature allows users to make necessary adjustments to their bookings without canceling and rebooking.
- Flight Update: Admins have the capability to update flight details, such as changing departure or arrival times, updating seat availability, or modifying airline information. These updates ensure that the flight information remains accurate and up-to-date.
### Delete:
- Booking Cancellation: Users can cancel their unpaid bookings, which removes the booking entry from the system and makes the seats available for other users.
- Flight Deletion: Admins can delete flights from the system, removing them from the available flights list. 

---
## Installation
Clone the repository:
```
git clone https://github.com/SistemBasisData2023/Go.Fly.git
```

### Frontend

- Ensure You’re on the right folder

  <img width="153" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/5bc53ff0-9cb4-4b98-b76f-2fb0b4333860">

  ```
  git clone https://github.com/SistemBasisData2023/QueueEase.git
  ```

- Run npm install to install all dependencies
  ```
   npm install
  ```
- To test the installation result run
  ```
  npm run dev
  ```
   <img width="288" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/a22d9c66-4e36-445f-9d48-31807f399a51">

### Backend

- Ensure You’re on the right folder

  <img width="162" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/634c08fa-b33a-4c19-be0a-868e18e21e21">

- Run npm install to install all dependencies
  ```
   npm install
  ```
- Create an .env file in your project root folder and add your variables.

  <img width="187" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/c6fd8cef-e5dd-4ec7-8fbf-81a72eb4d8c6">

- Insert Database Variables

- To test the installation result run
  ```
   npm run start
  ```

---
## Tables

### 1.  ```Country```
Stores information about countries.
```
name (TEXT): The name of the country.
two_letter (TEXT, Primary Key): The two-letter country code.
country_id (INTEGER): Unique identifier for the country.
```
### 2.  ```Subcountry```
Stores information about subcountries (subdivisions) within a country.
```
country (TEXT, Foreign Key - country.two_letter): The two-letter country code of the parent country.
subcountry_name (TEXT): The name of the subcountry.
subdivision (TEXT): Subdivision information (optional).
subcountry_level (TEXT): Level of the subcountry (optional).
Constraints: Each subcountry name must be unique within a country.
```

### 3.  ```Users```

Stores information about users.
```
user_id (UUID, Default: uuid_generate_v4(), Primary Key): Unique identifier for the user.
name (VARCHAR(50)): The user's first name.
surname (VARCHAR(50)): The user's last name.
gender (gender_type): The user's gender.
birthdate (DATE): The user's birthdate.
email (VARCHAR(100)): The user's email address.
phone_number (VARCHAR(20)): The user's phone number.
country (TEXT, Foreign Key - country.two_letter): The two-letter country code of the user's country.
province (TEXT, Foreign Key - subcountry.subcountry_name): The name of the user's province/subcountry.
password (VARCHAR(100)): The user's password.
isadmin (BOOLEAN): Indicates whether the user is an admin.
```
### 4.  ```Airports```

Stores information about airports.
```
code (VARCHAR(50), Primary Key): The airport code.
name (VARCHAR(200)): The name of the airport.
cityCode (VARCHAR(50)): The code of the city where the airport is located.
cityName (VARCHAR(200)): The name of the city where the airport is located.
countryName (VARCHAR(200)): The name of the country where the airport is located.
country (TEXT, Foreign Key - country.two_letter): The two-letter country code of the airport's country.
timezone (VARCHAR(8)): The timezone of the airport.
lat (VARCHAR(32)): The latitude coordinates of the airport.
lon (VARCHAR(32)): The longitude coordinates of the airport.
numAirports (INTEGER): The number of airports.
```
### 5.  ```Airline_list```

Stores information about airlines.
```
id (SERIAL, Primary Key): Unique identifier for the airline.
IATA (TEXT): The IATA code of the airline.
ICAO (TEXT): The ICAO code of the airline.
Airline (TEXT): The name of the airline.
Callsign (TEXT): The callsign of the airline.
country (TEXT, Foreign Key - country.two_letter): The two-letter country code of the airline's country.
logo (TEXT): The URL or path to the airline's logo.
description (TEXT): Description of the airline.
```
### 6.  ```Aircraft_model```

Stores information about aircraft models.
```
aircraft_id (SERIAL, Primary Key): Unique identifier for the aircraft model.
model (VARCHAR(100)): The model of the aircraft.
manufacturer (VARCHAR(100)): The manufacturer of the aircraft.
capacity (INTEGER): The capacity of the aircraft.
country (TEXT, Foreign Key - country.two_letter): The two-letter country code of the aircraft's country.
```

### 6.  ```Flights```

Stores information about flights.
```
flight_id (SERIAL, Primary Key): Unique identifier for the flight.
flight_airline_id (INTEGER, Foreign Key - airline_list.id): The ID of the airline operating the flight.
flight_no (CHARACTER(4)): The flight number.
aircraft_id (INTEGER, Foreign Key - aircraft_model.aircraft_id): The ID of the aircraft model used for the flight.
scheduled_departure (TIMESTAMP WITH TIME ZONE): The scheduled departure time of the flight.
scheduled_arrival (TIMESTAMP WITH TIME ZONE): The scheduled arrival time of the flight.
departure_airport (CHARACTER(3), Foreign Key - airports.code): The code of the departure airport.
arrival_airport (CHARACTER(3), Foreign Key - airports.code): The code of the arrival airport.
status (flight_status): The status of the flight.
seats_booked (INTEGER, Default: 0): The number of seats booked for the flight.
actual_departure (TIMESTAMP WITH TIME ZONE): The actual departure time of the flight.
actual_arrival (TIMESTAMP WITH TIME ZONE): The actual arrival time of the flight.
price (DECIMAL(10, 2)): The price of the flight.
```
### 6.  ```Booking```

Stores information about flight bookings.
```
booking_id (SERIAL, Primary Key): Unique identifier for the booking.
user_id (UUID, Foreign Key - Users.user_id): The ID of the user who made the booking.
flight_id (INTEGER, Foreign Key - flights.flight_id): The ID of the flight booked.
booking_date (TIMESTAMP WITH TIME ZONE): The date and time when the booking was made.
seats_booked (INTEGER, Default: 1): The number of seats booked for the booking.
seat_numbers (INTEGER[]): An array of seat numbers booked for the booking.
status (booking_status, Default: 'Unpaid'): The status of the booking.
```


## Relation Table and UML Diagram View
<details>
  <summary>Relation Table and UML Diagram View:</summary>

  ```Table Relational or ERD:```

![alt text](https://github.com/grandier/Blood-Works/blob/master/Information/ERD_Blood%20Works.jpg)

```UML:```

![alt text](https://github.com/grandier/Blood-Works/blob/master/Information/UML%20Database_Blood%20Works.png)

</details>

## User and Admin Flowchart View
<details>
  <summary>User and Admin Flowchart View:</summary>

  ```Flowchart of User```

![alt text](https://github.com/grandier/Blood-Works/blob/master/Information/Flowchart_User_Blood%20Works.png)

```Flowchart of Admin```

![alt text](https://github.com/grandier/Blood-Works/blob/master/Information/Flowchart_Admin_Blood%20Works.png)

</details>


---
![alt text](https://github.com/grandier/Blood-Works/blob/master/public/images/logo_bloodworks.png)

---
