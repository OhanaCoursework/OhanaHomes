import React from "react";
import "./layout.css";

const Hero = ({paragraph1, paragraph2, paragraph3, pathToOwnerPhoto, pathToTitleImage, ourStoryHeading, ourOwnerHeading, paragraph4, paragraph5, altTagTitleImage, altTagOwnerImage}) => {
  return (
    <section>
      <div color="black" className="titleBlock">
        <img src={pathToTitleImage} alt={altTagTitleImage}></img>
        <h1>About Us</h1>
      </div>
      <div className="ourStoryBlock">
        <h2>{ourStoryHeading}</h2>
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
        <p>{paragraph3}</p>
      </div>
      <div className="ourOwnerTextBlock">
        <h2>{ourOwnerHeading}</h2>
        <p>{paragraph4}</p>
        <p>{paragraph5}</p>
        <img src={pathToOwnerPhoto} alt ={altTagOwnerImage}></img>
      </div>
    </section>

  );
};

export default Hero;
