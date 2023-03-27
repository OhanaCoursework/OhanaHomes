import React from "react";
/* Importing necessary files and images */
import "./footer.css";
import facebookIcon from "../../assets/images/icons/facebookIcon.svg";
import instagramIcon from "../../assets/images/icons/instagramIcon.svg";
import twitterIcon from "../../assets/images/icons/twitterIcon.svg";
import websiteLogo from "../../assets/images/logo/ohanaHomesLogo.svg";

const Footer = () => {
  return (
    <footer className="Container">
      <div className="Row">
        <div className="Column1">
          <h1>Contact Us</h1>
          <p>
            An Address 123 address street,
            <br /> Hawaii 90210
          </p>
          <br />
          <p className="p1">testemail@email.com</p>
          <br />
          <p className="p2">(+1) 930 231 1231</p>
        </div>
        <div className="Column2">
          <div className="line" />
          <a href="home" className="Link">
            Home
          </a>
          <a href="aboutUs" className="Link">
            About
          </a>
          <a href="contactUs" className="Link">
            Contact
          </a>
          <a href="help" className="Link">
            Help
          </a>
        </div>
        <div className="Column3">
          <div className="line2" />
          <a href="http://www.facebook.com">
            <img className="icons" src={facebookIcon} />
          </a>
          <a href="http://www.twitter.com">
            <img className="icons" src={twitterIcon} />
          </a>
          <a href="http://www.instagram.com">
            <img className="icons" src={instagramIcon} />
          </a>
        </div>
        <div className="Column4">
          <a href="/">
            <img className="logo" src={websiteLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
