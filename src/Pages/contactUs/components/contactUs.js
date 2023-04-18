import React, { useState } from "react";
import "./contactUs.scss";


const ContactUs = ({pathToTitleImage}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <section className="ContactUs">
      <div color="black" className="titleBlock">
        <img id="HeadingImage" src={pathToTitleImage} alt="Image of a holiday home"></img>
        <h1 id="PageHeading">Contact Us</h1>
      </div>
      <div className="QuickLinksBlock">
        <h2 id="usefulLinksHeader">Useful Links</h2>
        <div className="horizontallist">
          <ul>
            <li><span className="listWidgets"></span><a id="LinkToAboutUs" href="/aboutUs"><button type="button">About Us</button></a></li>
            <li><span className="listWidgets"></span><a id="LinkToMarketPlace" href="/marketplace"><button type="button">Marketplace</button></a></li>
            <li><span className="listWidgets"></span><a id="LinkToHome" href="/"><button type="button">Home</button></a></li>
          </ul>
        </div>
      </div>
      <div className="CommentBlock">
        <h2 id="getInContactHeader">Get in Contact</h2>
        <h3>Leave us a review or get in contact with our team</h3>
        <form id="contactUsForm">
          <input className="emailInput" type="text" name="userEmail" placeholder="Email Address" />   
          <textarea id="commentArea" name="comment" rows="10" cols="50" spellCheck="true" maxLength={500}></textarea>
          <button type="Submit" onClick={() => setToggle(!toggle)} className="sendButton">Send</button>
          {toggle && (
            <h2 className="emailConfirmation">Email Sent</h2>
          )}
        </form>
      </div>
      <div className="WhereToFindUsBlock">
        <h2 id="whereToFindUsHeader">Where to Find Us</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90186.7615211994!2d-157.92047030800617!3d21.33667051131379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006e5c1cddb487%3A0xb21220a7a2e42394!2s2121%20N%20Nimitz%20Hwy%2C%20Honolulu%2C%20HI%2096819%2C%20USA!5e0!3m2!1sen!2suk!4v1681691181606!5m2!1sen!2suk" width="1100" height="500" title="whereToFindUsMap"></iframe>
      </div>
    </section>
  );
};

export default ContactUs;