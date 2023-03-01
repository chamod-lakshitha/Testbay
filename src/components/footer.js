import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="main-container">
        <div className="footer-main-outer">
          <div className="about-us">
            <div className="about-us-title">About Testbay</div>
            <div className="about-us-des">
              Testbay is a online selling site which was created in 2020.
              Testbay provides variety of items with good quality for reasonable
              price. Testbay have more than 10000k buyers and also more than
              100k sellers. Testbay provides 7 days return time period and also
              return the bash back if the buyer did not receive the good
              ordered. Have a great shopping with Testbay
            </div>
          </div>
          <div className="container">
            <div className="join-with-us">
              <div className="join-with-us-title">About Testbay</div>
              <div className="join-with-us-des">
                If you are interested in joining with us as seller and increase
                your sales contact us via the email given below.
              </div>
              <p className="email">testBay.123@testbay.lk</p>
            </div>
            <div className="contact-us">
              <div className="contact-us-title">About Testbay</div>
              <div className="contact-us-des">
                Call or email us if you have any questions, or if you’d just
                like to talk.
              </div>
              <p className="email">testBay.123@testbay.lk</p>
              <p className="tel">000-0000-000</p>
            </div>
          </div>
          <div className="site-map-outer">
            <div className="site-map-title">Site map</div>
            <div className="links">
              <NavLink className={'link'} to="/sign_in">
                Sign-in
              </NavLink>
              <NavLink className={'link'} to="/log_in">
                Log-in
              </NavLink>
              <NavLink className={'link'} to="/sign_out">
                Sign-out
              </NavLink>
              <NavLink className={'link'} to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className={'link last'} to="/sign_in">
                Purchase history
              </NavLink>
            </div>
          </div>
          <div className="logo-social-media-icon-container">
            <div className="logo"></div>
          </div>
        </div>
        <div className="copy-right">
          Copyright © 2022 Testbay.&nbsp;&nbsp;&nbsp; Powered by: React
        </div>
      </div>
    </>
  );
};

export default Footer;
