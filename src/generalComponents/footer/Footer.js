import React from "react";
/* Importing necessary files and images */
import "./footer.scss";
import facebookIcon from "../../assets/images/icons/facebookIcon.svg";
import instagramIcon from "../../assets/images/icons/instagramIcon.svg";
import twitterIcon from "../../assets/images/icons/twitterIcon.svg";
import websiteLogo from "../../assets/images/logo/footerLogo.svg";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="Row" id="Row">
        <div className="Column1" id="Column1">
          <h1 className="footer-h1" id="footer-heading">
            Contact Us
          </h1>
          <p className="footer-paragraph" id="footer-address">
            2121 North Nimitz Highway,
            <br /> Honolulu, HI 96819,
            <br /> United States
          </p>
          <br />
          <p className="footer-paragraph" id="footer-email">
            ohanahomes@gmail.com
          </p>
          <br />
          <p className="footer-paragraph .LastParagraph" id="footer-phone">
            (+1) 930-231-1231
          </p>
        </div>
        <div className="Column2 line">
          <a href="home" className="Link" id="home-link">
            Home
          </a>
          <a href="aboutUs" className="Link" id="about-link">
            About Us
          </a>
          <a href="contactUs" className="Link" id="contact-link">
            Contact Us
          </a>
          <a href="help" className="Link" id="help-link">
            Help
          </a>
        </div>
        <div className="Column3 line">
          <a
            href="https://www.facebook.com/McDonalds2915EManoaRd/"
            id="facebook-logo"
          >
            <img className="icons" src={facebookIcon} />
          </a>
          <a
            href="https://twitter.com/McDonaldsHawaii?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            id="twitter-logo"
          >
            <img className="icons" src={twitterIcon} />
          </a>
          <a
            href="https://www.instagram.com/mcdonaldshawaii/?hl=en"
            id="instagram-logo"
          >
            <img className="icons" src={instagramIcon} />
          </a>
        </div>
        <div className="Column4">
          <a href="/">
            <img className="logo" id="website-logo" src={websiteLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
