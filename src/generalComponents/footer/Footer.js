import React from "react";
/* Importing necessary files and images */
import "./footer.css";
import facebookIcon from "../../assets/images/icons/facebookIcon.svg";
import instagramIcon from "../../assets/images/icons/instagramIcon.svg";
import twitterIcon from "../../assets/images/icons/twitterIcon.svg";
import websiteLogo from "../../assets/images/logo/footerLogo.svg";

const Footer = () => {
  return (
    <footer className="Container">
      <div className="Row">
        <div className="Column1">
          <h1>Contact Us</h1>
          <p>
            2121 North Nimitz Highway,
            <br /> Honolulu, HI 96819,
            <br /> United States
          </p>
          <br />
          <p>testemail@email.com</p>
          <br />
          <p className="LastParagraph">(+1) 930-231-1231</p>
        </div>
        <div className="Column2 line">
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
        <div className="Column3 line">
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
