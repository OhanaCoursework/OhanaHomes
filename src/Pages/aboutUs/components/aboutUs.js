import React from "react";
import "./layout.css";
import pathToTitleImage from "../../../assets/images/aboutUsPageImg.jpg";
import pathToOwnerPhoto from"../../../assets/images/ourOwnerImg.jpg";

const Hero = () => {
  return (
    <section>
      <div color="black" className="titleBlock">
        <img src={pathToTitleImage} alt="Image of Hawaiian Holiday Home"></img>

        <h1>About Us</h1>
      </div>
      <div className="ourStoryBlock">
        <h2>Our story So Far</h2>
        <p>What, what, ma? Don&apos;t pay any attention to him, he&apos;s in one of his moods. Sam, quit fiddling with that thing, come in here to dinner. Now let&apos;s see, you already know Lorraine, this is Milton, this is Sally, that&apos;s Toby, and over there in the playpen is little baby Joey. Hello. What? Uncle Jailbird Joey?</p>
        <p>No wait, Doc, the bruise, the bruise on your head, I know how that happened, you told me the whole story. you were standing on your toilet and you were hanging a clock, and you fell, and you hit your head on the sink, and that&apos;s when you came up with the idea for the flux capacitor, which makes time travel possible. Radiation suit, of course, cause all of the fall out from the atomic wars. This is truly amazing, a portable television studio. No wonder your president has to be an actor, he&apos;s gotta look good on television. Well, I figured, what the hell. Good, I&apos;ll see you tonight. Don&apos;t forget, now, 1:15 a.m., Twin Pines Mall. Well gee, I don&apos;t know.</p>
        <p>Check out that four by four. That is hot. Someday, Jennifer, someday. Wouldn&apos;t it be great to take that truck up to the lake. Throw a couple of sleeping bags in the back. Lie out under the stars. So tell me, future boy, who&apos;s president of the United States in 1985? George, there&apos;s nothing to be scared of. All it takes is a little self confidence. You know, if you put your mind to it, you could accomplish anything. That&apos;s him. Great good, good, Lorraine, I had a feeling about you two.</p>
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
