import React from "react";
import "./layout.css";

const AboutUs = ({paragraph1, paragraph2, paragraph3, pathToOwnerPhoto, pathToTitleImage, ourStoryHeading, ourOwnerHeading, paragraph4, paragraph5, altTagTitleImage, altTagOwnerImage}) => {
  return (
    <section>
      <div color="black" className="titleBlock">
        <img data-testid="HeadingImage" src={pathToTitleImage} alt={altTagTitleImage}></img>
        <h1 id="PageHeading" data-testid="PageHeading">About Us</h1>
      </div>
      <div className="ourStoryBlock">
        <h2 data-testid="OurStoryHeading">{ourStoryHeading}</h2>
        <p data-testid="paragraph1">{paragraph1}</p>
        <p data-testid="paragraph2">{paragraph2}</p>
        <p data-testid="paragraph3">{paragraph3}</p>
      </div>
      <div className="ourOwnerTextBlock">
        <h2>{ourOwnerHeading}</h2>
        <p data-testid="paragraph4">{paragraph4}</p>
        <p data-testid="paragraph5">{paragraph5}</p>
        <img data-testid="OurOwnerImage" src={pathToOwnerPhoto} alt ={altTagOwnerImage}></img>
      </div>
    </section>

  );
};

export default AboutUs;
