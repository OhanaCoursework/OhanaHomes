import React from "react";
import "./contactUs.scss";

const ContactUs = ({pathToTitleImage}) => {
  return (
    <section className="ContactUs">
      <div color="black" className="titleBlock">
        <img id="HeadingImage" src={pathToTitleImage} alt="Image of a holiday home"></img>
        <h1 id="PageHeading">Contact Us</h1>
      </div>
      <div className="QuickLinksBlock">
        <h2>Useful Links</h2>
        <div className="horizontallist">
          <ul>
            <li><span className="listWidgets"></span><a id="LinkToAboutUs" href="/aboutUs"><button type="button">About Us</button></a></li>
            <li><span className="listWidgets"></span><a id="LinkToMarketPlace" href="/marketplace"><button type="button">Marketplace</button></a></li>
            <li><span className="listWidgets"></span><a id="LinkToHome" href="/marketplace"><button type="button">Home</button></a></li>
          </ul>
        </div>
      </div>
      <div className="CommentBlock">
        <h2>Get in Contact</h2>
        <h3>Leave us a review or get in contact with our team</h3>
        <textarea id="commentArea" name="comment" rows="10" cols="50" spellCheck="true" maxLength={500}></textarea>
        <button className="sendButton">Send</button>
      </div>
      <div className="WhereToFindUsBlock">
        <h2>Where to Find Us</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84790.81549505469!2d-155.7621992951952!3d19.090669226300037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x79514bc4c7607715%3A0xf3e3e69e9d28acd!2sOcean%20View%20Market!5e0!3m2!1sen!2suk!4v1681420166750!5m2!1sen!2suk" width="950" height="500"></iframe>
      </div>
    </section>
  );
};

export default ContactUs;