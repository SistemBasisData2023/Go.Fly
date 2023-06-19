import FlightForm from '../components/flight-form/flight-form'
import hawaian from '../assets/images/hawaian.png'
import japan from '../assets/images/japan.png'
import delta from '../assets/images/delta.png'
import { Link } from 'react-router-dom';
import '../styles/search.css'


const Search = () => {
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
      <div className="w-75">
        <div style={{ paddingTop: "1rem" }}>
          <FlightForm />
        </div>

        <div className="filter-wrapper">
          <select data-te-select-init required className="">
            <option value="">Price</option>
          </select>
          <select data-te-select-init required className="">
            <option value="">Times</option>
          </select>
          <select data-te-select-init required className="">
            <option value="">Airlines</option>
          </select>
          <div>Clear filters</div>
        </div>
        <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          Choose a <strong style={{ color: "#eb5757" }}>Flight!</strong>{" "}
          {/* flight */}
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-75">
          <div className="list-total-wrapper">
            {listFlights.map((item, idx) => (
              <div>
                <div key={idx} className="item allflight">
                  <div className="item-list-total ">
                    <img src={item.url} alt="" />
                    <div>
                      <div>16h 45m</div>
                      <div style={{ color: "#7C8DB0" }}>{item.name}</div>
                    </div>
                  </div>
                  <div>7:00AM - 4:15PM</div>
                  <div>
                    <div>1 stop</div>
                    <div style={{ color: "#7C8DB0" }}>2h 45m in HNL</div>
                  </div>
                  <div>
                    <div>$624</div>
                    <div style={{ color: "#7C8DB0" }}>rounded trip</div>
                  </div>
                </div>
                {idx !== listFlights.length - 1 && (
                  <hr style={{ color: "#e9e8fc " }} />
                )}
              </div>
            ))}
          </div>
          <div
            className="flex"
            style={{ justifyContent: "flex-end", paddingTop: "1rem" }}
          >
            <button className="btn-show-flights">Show all flights</button>
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
            <Link to="/booking">
            <button
              className="btn-search"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Payment
            </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;