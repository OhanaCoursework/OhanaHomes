import React from "react";
import "./aboutUs.scss";

const AboutUs = ({paragraph1, paragraph2, paragraph3, pathToOwnerPhoto, pathToTitleImage, ourStoryHeading, ourOwnerHeading, paragraph4, paragraph5, altTagTitleImage, altTagOwnerImage}) => {
  return (
    <section className="aboutUs">
      <div color="black" className="titleBlock">
        <img id="HeadingImage" src={pathToTitleImage} alt={altTagTitleImage}></img>
        <h1 id="PageHeading" data-testid="PageHeading">About Us</h1>
      </div>
      <div className="ourStoryBlock">
        <h2 id="OurStoryHeading">{ourStoryHeading}</h2>
        <p id="paragraph1">{paragraph1}</p>
        <p id="paragraph2">{paragraph2}</p>
        <p id="paragraph3">{paragraph3}</p>
      </div>
      <div className="ourOwnerTextBlock">
        <h2>{ourOwnerHeading}</h2>
        <img id="OurOwnerImage" src={pathToOwnerPhoto} alt ={altTagOwnerImage}></img>
        <p id="paragraph4">{paragraph4}</p>
        <p id="paragraph5">{paragraph5}</p>
      </div>
    </section>

  );
};

export default AboutUs;
