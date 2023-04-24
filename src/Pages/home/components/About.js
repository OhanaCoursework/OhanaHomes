import React from "react";
import "../styles/about.scss";

const About = () => {
  return (
    <section>
      <div color="black" className="about">
        <h1 id="about-title">Welcome to Ohana Homes</h1>
        <p>
          Ohana Homes is a premier real estate agency based in Hawaii, serving
          clients with a team of experienced professionals who are dedicated to
          exceeding your expectations. With a proven track record of success, we
          have earned a reputation as Hawaii&apos;s trusted performers in the
          real estate industry.
        </p>
        <p>
          Our mission is to provide exceptional service to our clients, whether
          you are buying, selling, or investing in real estate. We understand
          that each client&apos;s needs are unique, and we take pride in
          tailoring our services to meet those needs with the utmost
          professionalism and integrity.
        </p>
        <p>
          Our team of experts brings a wealth of experience and local market
          knowledge to the table. We stay up-to-date with the latest industry
          trends and technologies, allowing us to provide cutting-edge
          strategies and solutions to help our clients achieve their real estate
          goals. We are committed to delivering results and exceeding
          expectations, making your real estate journey a seamless and rewarding
          experience.
        </p>
        <div className="horizontalList">
          <ul>
            <li>
              <span className="listWidgets">$648M</span>
              <br></br>Total Team Sales
            </li>
            <li>
              <span className="listWidgets">350</span>
              <br></br>Sales This Year
            </li>
            <li>
              <span className="listWidgets">204</span>
              <br></br>Total Years of Experience
            </li>
          </ul>
        </div>
        <a id="linkToAboutUs" aria-label="Button to the About Us Page" href="/aboutUs">
          <button type="button">Learn More About Us</button>
        </a>
      </div>
    </section>
  );
};

export default About;
