import "./global.css";
import "./index.css"


function Flights() {

    return (
        <>
        <div className="full-main-page">
      <div className="main-frame">
        <div className="header-not-sign-in">
          <div className="gofly">GoFly!</div>
          <div className="nav-navigation-menu">
            <div className="nav-list-item">
              <div className="label">Flights</div>
            </div>
            <button className="nav-list-item1">
              <div className="label1">Sign in</div>
            </button>
            <button className="button" id="button_signup">
              <div className="label2">Sign up</div>
            </button>
            <img
              className="header-avatar"
              alt=""
              src="../public/header--avatar.svg"
            />
          </div>
        </div>
        <div className="hero">
          <div className="hero-wrapper">
            <div className="hero1">
              <div className="discover-the-world-container">
                <p className="discover-the-world">Discover The World:</p>
                <p className="discover-the-world">Book Your Flight Today!</p>
              </div>
            </div>
          </div>
          <div className="flight-search">
            <input className="text-input" type="text" required />

            <div className="divider"></div>
            <input className="text-input" type="text" required />

            <div className="divider"></div>
            <div className="text-input2">
              <div className="base-text-input">
                <img
                  className="calendar-with-dates"
                  alt=""
                  src="../public/32--calendar-with-dates.svg"
                />

                <div className="label3">Depart - Return</div>
                <img
                  className="eye-show-visible"
                  alt=""
                  src="../public/32--eye-show-visible.svg"
                />
              </div>
              <div className="helper-text">
                <div className="label">Helper text</div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="text-input3">
              <div className="base-text-input">
                <img
                  className="calendar-with-dates"
                  alt=""
                  src="../public/32--person-solid.svg"
                />
                <div className="label3">1 adult</div>
                <img
                  className="eye-show-visible"
                  alt=""
                  src="../public/32--eye-show-visible.svg"
                />
              </div>
              <div className="helper-text">
                <div className="label">Helper text</div>
              </div>
            </div>
            <button className="button">
              <div className="label5">Search</div>
            </button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="desktop-footer">
          <div className="footer-content">
            <div className="gofly1">GoFly!</div>
            <div className="column-about">
              <div className="footer-column-header">
                <b className="footer-header">About</b>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">About Tripma</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">How it works</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Careers</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Press</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Blog</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Forum</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">list items using</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">Cmd + Shift + H</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">or the eye icon in</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">the layers panel</div>
              </div>
            </div>
            <div className="column-partner">
              <div className="footer-column-header">
                <b className="footer-header">Partner with us</b>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Partnership programs</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Affiliate program</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Connectivity partners</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Promotions and events</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Integrations</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Community</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Loyalty program</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">Cmd + Shift + H</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">or the eye icon in</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">the layers panel</div>
              </div>
            </div>
            <div className="column-about">
              <div className="footer-column-header">
                <b className="footer-header">Support</b>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Help Center</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Contact us</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Privacy policy</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Terms of service</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Trust and safety</div>
              </div>
              <div className="footer-list-item">
                <div className="footer-header">Accessibility</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">list items using</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">Cmd + Shift + H</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">or the eye icon in</div>
              </div>
              <div className="footer-list-item6">
                <div className="footer-header">the layers panel</div>
              </div>
            </div>
            <div className="column-mobile">
              <div className="footer-link-column">
                <div className="footer-column-header">
                  <b className="footer-header">Get the app</b>
                </div>
                <div className="footer-list-item">
                  <div className="footer-header">Tripma for Android</div>
                </div>
                <div className="footer-list-item">
                  <div className="footer-header">Tripma for iOS</div>
                </div>
                <div className="footer-list-item">
                  <div className="footer-header">Mobile site</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">Resize the column</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">to make it wider.</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">Hide unused</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">list items using</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">Cmd + Shift + H</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">or the eye icon in</div>
                </div>
                <div className="footer-list-item6">
                  <div className="footer-header">the layers panel</div>
                </div>
              </div>
              <img
                className="link-app-store"
                alt=""
                src="../public/link--app-store.svg"
              />

              <div className="link-google-play">
                <img
                  className="link-google-play1"
                  alt=""
                  src="../public/link--google-play@2x.png"
                />
              </div>
            </div>
          </div>
          <img
            className="footer-divider"
            alt=""
            src="../public/footer--divider.svg"
          />

          <div className="bottom">
            <div className="social-media-stack">
              <img className="twitter-icon" alt="" src="../public/24--twitter.svg" />

              <a className="instagram" href="https://www.instagram.com/nisaprajudi">
                <img className="union-icon" alt="" src="../public/union.svg" />
              </a>
              <img
                className="twitter-icon"
                alt=""
                src="../public/24--facebook.svg"
              />
            </div>
            <div className="label">© 2023 GoFly incorporated</div>
          </div>
        </div>
      </div>
    </div>

        </>
    )
  }
  
  export default Flights