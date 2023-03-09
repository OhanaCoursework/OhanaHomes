import React from "react";
import "./layout.css";

const Hero = ({paragraph1, paragraph2, paragraph3, pathToOwnerPhoto, pathToTitleImage}) => {
  return (
    <section>
      <div color="black" className="titleBlock">
        <img src={pathToTitleImage} alt="Image of Hawaiian Holiday Home"></img>
        <h1>About Us</h1>
      </div>
      <div className="ourStoryBlock">
        <h2>Our story So Far</h2>
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
        <p>{paragraph3}</p>
      </div>
      <div className="ourOwnerTextBlock">
        <h2>Our Owner</h2>
        <p>Alright kid, you stick to your father like glue and make sure that he takes her to the dance. Wait a minute, wait a minute. 1:15 in the morning? You&apos;re gonna break his arm. Biff, leave him alone. Let him go. Let him go. Hey, hey, keep rolling, keep rolling there. No, no, no, no, this sucker&apos;s electrical. But I need a nuclear reaction to generate the one point twenty-one gigawatts of electricity that I need. Well, uh, listen, uh, I really-</p>
        <p>Oh, uh, hey you, get your damn hands off her. Do you really think I oughta swear? Of course not, Biff, now I wouldn&apos;t want that to happen. Now, uh, I&apos;ll finish those reports up tonight, and I&apos;ll run em them on over first thing tomorrow, alright? What? I&apos;m writing this down, this is good stuff. This sounds pretty heavy.</p>
      </div>
      <div className="ourOwnerPhoto">
        <img src={pathToOwnerPhoto} alt = "A photo of our Owner"></img>
      </div>
    </section>

  );
};

export default Hero;
