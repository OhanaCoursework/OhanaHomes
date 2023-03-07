import React from "react";
import "./layout.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div color="black" className="aboutUs">
        <h1>Hawaii&apos;s Trusted Performers</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lacus eget nulla scelerisque dapibus sit amet id ex. Fusce ut velit ut orci aliquet cursus id vitae ligula. Phasellus in rutrum mi, sed maximus dolor. Donec sit amet tincidunt eros. Curabitur pulvinar tempus aliquet.</p> 
        <p>Mauris ac suscipit lorem. Curabitur tempus magna mi, sit amet tempus nisi congue a. Phasellus ut magna leo. Donde esta la bibliotechia, ni hao, ni ha min. i ch habe zwei geschwestern und einen? Ja Ich Sprechen sie Deutsch, Du bist?</p>
      <div className="horizontalList">
        <ul>
          <li><span className="listWidgets">$648M</span><br></br>Total Team Sales</li>
          <li><span className="listWidgets">350</span><br></br>Sales This Year</li>
          <li><span className="listWidgets">204</span><br></br>Total Years of Experience</li>
        </ul> 
      </div>
        <Link to="/aboutUs"><button type="button">About Us</button></Link>
      </div>
    </section>
  );
};

export default About;
