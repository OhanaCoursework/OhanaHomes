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
            <a className="contactLink" href = "mailto: ohanahomes@gmail.com">ohanahomes@gmail.com</a>
          </p>
          <br />
          <p className="footer-paragraph .LastParagraph" id="footer-phone">
            <a className="contactLink" href="tel: 930231231">(+1) 930-231-1231</a>
          </p>
        </div>
        <div className="Column2 line">
          <a href="/" aria-label="Link in Footer to the Home Page" className="Link" id="home-link">
            Home
          </a>
          <a href="aboutUs" aria-label="Link in Footer to About Us Page" className="Link" id="about-link">
            About Us
          </a>
          <a href="contactUs" aria-label="Link in Footer to Contact Us Page" className="Link" id="contact-link">
            Contact Us
          </a>
        </div>
        <div className="Column3 line">
          <a
            aria-label="Facebook logo"
            href="https://www.facebook.com/McDonalds2915EManoaRd/"
            id="facebook-logo"
            alt="Facebook Logo"
          >
            <img className="icons" alt="Facebook Icon" src={facebookIcon} />
          </a>
          <a
            aria-label="Twitter logo"
            href="https://twitter.com/McDonaldsHawaii?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            id="twitter-logo"
            alt="Twitter Logo"
          >
            <img className="icons" alt="Twitter Icon" src={twitterIcon} />
          </a>
          <a
            aria-label="Instagram logo"
            href="https://www.instagram.com/mcdonaldshawaii/?hl=en"
            id="instagram-logo"
            alt="Instagram Logo"
          >
            <img className="icons" alt="Instagram Icon" src={instagramIcon} />
          </a>
        </div>
        <div className="Column4">
          <a
          aria-label="Ohana Homes logo"
          alt="Ohana Homes Logo"
          href="/">
            <img className="logo" id="website-logo" alt="Ohana Homes Logo" src={websiteLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
