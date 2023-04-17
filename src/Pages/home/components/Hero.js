import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useSpring, animated } from "react-spring";
import "../styles/hero.css";

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(nextSlide, 5000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const animations = useSpring({
    from: { opacity: "0", marginTop: -250 },
    to: { opacity: "1", marginTop: 0 },
    config: { duration: "1000" },
  });

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 37) {
      // Left arrow key
      prevSlide();
    } else if (e.keyCode === 39) {
      // Right arrow key
      nextSlide();
    }
  };

  return (
    <animated.div style={animations} onKeyDown={handleKeyDown} tabIndex={0}>
      <section className="HeroSection">
        {slides.map((slide, index) => {
          return (
            <div className="HeroSlide" key={index}>
              {index === current && (
                <div className="HeroSlider">
                  <img
                    id
                    className="HeroImage"
                    src={slide.image}
                    alt={slide.alt}
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
