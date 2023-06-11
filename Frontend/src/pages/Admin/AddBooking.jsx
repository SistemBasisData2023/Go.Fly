import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const EditBooking = ({ match, history }) => {
  const { bookingId } = match.params;

  const [booking, setBooking] = useState({});
  const [seatsBooked, setSeatsBooked] = useState(0);
  const [seatNumbers, setSeatNumbers] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch booking data from the server based on the bookingId
    axios.get(`/admin/bookings/${bookingId}`)
      .then(response => {
        setBooking(response.data);
        setSeatsBooked(response.data.seats_booked);
        setSeatNumbers(response.data.seat_numbers.join(', '));
        setStatus(response.data.status);
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });
  }, [bookingId]);

  const handleUpdate = () => {
    // Prepare the updated booking data
    const updatedBooking = {
      seatsBooked,
      seatNumbers: seatNumbers.split(',').map(number => number.trim()),
      status,
    };

    // Send the updated booking data to the server
    axios.put(`/admin/bookings/${bookingId}`, updatedBooking)
      .then(response => {
        console.log('Booking updated successfully:', response.data);
        history.push('/admin/bookings');
      })
      .catch(error => {
        console.error('Error updating booking:', error);
      });
  };

  return (
    <div>
      <h2>Edit Booking</h2>
      <form>
        <div>
          <label>Seats Booked:</label>
          <input type="number" value={seatsBooked} onChange={e => setSeatsBooked(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Seat Numbers:</label>
          <input type="text" value={seatNumbers} onChange={e => setSeatNumbers(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Unpaid">Unpaid</option>
            <option value="Booked">Booked</option>
          </select>
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EditBooking;