import React, { useState, useRef, useEffect } from "react";
import Button from "./Button"; // Importing Button component
import { IoMdArrowRoundForward } from "react-icons/io"; // Importing arrow icon from react-icons library
import { IoArrowForward, IoArrowBack } from "react-icons/io5"; // Importing arrow icons from react-icons library
import { useSpring, animated } from "react-spring"; // Importing animation hooks from react-spring library
import "../styles/hero.css"; // Importing CSS file for Hero component

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0); // State for current slide index
  const length = slides.length; // Length of slides array
  const timeout = useRef(null); // Ref for timeout

  // Preload previous and next images in local storage
  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1)); // Update current slide index
    };

    // Preload previous image
    const preloadedPrevImage = new Image();
    preloadedPrevImage.src =
      slides[current === 0 ? length - 1 : current - 1].image;

    // Preload next image
    const preloadedNextImage = new Image();
    preloadedNextImage.src =
      slides[current === length - 1 ? 0 : current + 1].image;

    const timeoutId = setTimeout(nextSlide, 10000); // Set timeout to automatically switch to next slide after 10 seconds

    return function cleanup() {
      clearTimeout(timeoutId); // Clean up timeout on component unmount
    };
  }, [current, length, slides]);

  // Function to go to next slide
  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current); // Clear previous timeout if exists
    }

    setCurrent(current === length - 1 ? 0 : current + 1); // Update current slide index
  };

  // Function to go to previous slide
  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current); // Clear previous timeout if exists
    }

    setCurrent(current === 0 ? length - 1 : current - 1); // Update current slide index
  };

  // Animation configuration using react-spring
  const animations = useSpring({
    from: { opacity: "0", marginTop: -250 },
    to: { opacity: "1", marginTop: 0 },
    config: { duration: "1000" },
  });

  // If slides array is not an array or is empty, return null
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  // Function to handle keydown event for left and right arrow keys
  const handleKeyDown = (e) => {
    if (e.keyCode === 37) {
      // Left arrow key
      prevSlide(); // Call prevSlide function
    } else if (e.keyCode === 39) {
      // Right arrow key
      nextSlide(); // Call nextSlide function
    }
  };

  // Return the Hero component with animated div for slide animations
  return (
    <animated.div style={animations} onKeyDown={handleKeyDown} tabIndex={0}>
      <section className="HeroSection">
        {/* Map through slides array and render each slide */}
        {slides.map((slide, index) => {
          return (
            <div className="HeroSlide" key={index}>
              {index ===
  current && (
                <div className="HeroSlider">
                  <img
                    id
                    className="HeroImage"
                    src={slide.image}
                    alt={slide.alt}
                    loading="eager" 
                    onLoad={animations.onStart}
                  />
                  <div className="HeroContent">
                    <h1 id="slide-title">{slide.title}</h1>
                    <p id="slide-price">{slide.price}</p>
                    <Button
                      css={`
                        max-width: 160px;
                        font-size: clamp(0.5rem, 3vw, 1rem);
                      `}
                    >
                      {slide.label}

                      <IoMdArrowRoundForward className="arrow" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="sliderButtons">
          <IoArrowBack
            id="arrow-back"
            className="arrowButtons"
            onClick={prevSlide}
          />
          <IoArrowForward
            id="arrow-forward"
            className="arrowButtons"
            onClick={nextSlide}
          />
        </div>
      </section>
    </animated.div>
  );
};

export default Hero;
