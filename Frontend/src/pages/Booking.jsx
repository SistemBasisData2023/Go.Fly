import React from "react"
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import hawaian from '../assets/images/hawaian.png'
import japan from '../assets/images/japan.png'
import delta from '../assets/images/delta.png'
import { Link } from 'react-router-dom';
import '../styles/booking.css'
const Booking = () => {
  const listFlights = [
    {
      url: hawaian,
      name: "Hawaiian Airlines",
    },
    {
      url: japan,
      name: "Japan Airlines",
    },
    {
      url: delta,
      name: "Delta Airlines",
    },
  ];
  return (
    <main className="max-w-screen">
      <div className="flex gap-6">
        <div className="w-75">
          <div className="list-payment-wrapper">
            <h1>Payment method</h1>
            <p>The payment method is only by Credit Card. GoFly  processes your payment securely with end-to-end encryption.</p>
            <button className="btn-search">
              Credit Card
            </button>
            <h2>Credit card details</h2>
            <Form>
              <label class="checkbox">
                <input type="checkbox" />
                <span>Billing address is same as Passenger 1</span>
              </label>
              <FormGroup>
                <input type="text" placeholder="Name on card"/>
              </FormGroup>
              <FormGroup>
                <input type="text" placeholder="Card number"/>
              </FormGroup>
              <label class="checkbox">
                <input type="checkbox" />
                <span>Save card and create account for later</span>
              </label>
            </Form>
            <h2>Cancellation policy</h2>
            <p>This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before the departure date, you are eligible for a free refund. All flights booked on GoFly are backed by our satisfaction guarantee, however cancellation policies vary by airline. See the full cancellation policy for this flight.</p>
          </div>
        </div>
        <div className="w-25">
          <div className="list-total-wrapper">
            {[...Array(1)].map((item, idx) => (
              <div>
                <div key={idx} className="item" style={{ gap: "1rem" }}>
                  <div className="item-list-total">
                    <img src={hawaian} alt="" />
                    <div>
                      <div>Hawaiian Airlines</div>
                      <div style={{ color: "#7C8DB0" }}>FIG4312</div>
                    </div>
                  </div>
                  <div>
                    <div>16h 45m (+1d)</div>
                    <div>7:00 AM - 4:15 PM</div>
                    <div>2h 45m in HNL</div>
                  </div>
                </div>
                {idx !== 1 && <hr style={{ color: "#7C8DB0 !important" }} />}
              </div>
            ))}
          </div>
          <div className="subtotal-text">
            <div>
              Subtotal <span>$503</span>
            </div>
            <div>
              Taxes & Fees <span>$121</span>
            </div>
            <div>
              Total <span>$624</span>
            </div>
            <Link to="/thank-you">
            <button className="btn-search">
              Confirm and Pay
            </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
